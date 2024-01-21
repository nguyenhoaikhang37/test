import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { assign } from 'lodash'
import { Model } from 'mongoose'
import { arrayUtils, cleanObj } from 'src/utils'
import { BoardService } from '../board/board.service'
import { Board } from '../board/schemas/board.schema'
import { BoardDataBlock } from '../common'
import { TypeIds } from '../common.types'
import { PubSubService } from '../pubsub/pubsub.service'
import { CreateColumnInput, UpdateColumnInput } from './column.input'
import { Column } from './column.schema'

@Injectable()
export class ColumnService {
  constructor(
    @InjectModel(Column.name) private readonly columnModel: Model<Column>,
    @InjectModel(Board.name) private readonly boardModel: Model<Board>,
    private readonly pubsubService: PubSubService,
    @Inject(forwardRef(() => BoardService))
    private readonly boardService: BoardService
  ) {}
  async findById(columnId: string) {
    return this.columnModel.findById(columnId)
  }
  async findByColumnsId(columnsId: string[]): Promise<Column[]> {
    const columns = await this.columnModel.find({
      _id: { $in: columnsId }
    })

    return columns
  }

  async findByRootId(rootId: string): Promise<Column[]> {
    const regexPattern = new RegExp(`${rootId}`)
    return await this.columnModel
      .find({
        ancestorPath: { $regex: regexPattern }
      })
      .lean()
  }

  formatToBoardDataBlock = (column: Column): BoardDataBlock => {
    return {
      ...column,
      _blockType: 'Column'
    }
  }

  //#region mutation
  async createColumn({
    boardId,
    createdById,
    ...data
  }: CreateColumnInput & TypeIds<'boardId' | 'createdById'>) {
    const board = await this.boardModel.findById(boardId)
    if (!board) {
      throw new NotFoundException('Board not found')
    }

    const column = await this.columnModel.create({
      ...data,
      ancestorPath: boardId,
      createdById,
      parentId: boardId
    })

    board.columnsId.push(column._id)
    await board.save()

    await this.pubsubService.boardDatablocksUpdated([
      this.boardService.formatToBoardDataBlock(board.toObject()),
      this.formatToBoardDataBlock(column.toObject())
    ])

    return true
  }

  async updateColumn({
    columnId,
    modifiedById,
    ...data
  }: UpdateColumnInput & TypeIds<'modifiedById' | 'columnId'>) {
    const column = await this.columnModel.findById(columnId)
    if (!column) {
      throw new NotFoundException(`Column with id ${columnId} not found`)
    }

    assign(column, { ...cleanObj(data), modifiedById, updatedAt: new Date() })
    column.save()

    await this.pubsubService.boardDatablocksUpdated([
      this.formatToBoardDataBlock(column.toObject())
    ])

    return true
  }

  async updateColumnPosition({
    boardId,
    columnId,
    toPosition
  }: {
    toPosition: number
  } & TypeIds<'modifiedById' | 'boardId' | 'columnId'>): Promise<boolean> {
    const board = await this.boardModel.findOne({
      _id: boardId,
      columnsId: { $in: [columnId] }
    })

    if (!board) {
      throw new NotFoundException(`Board or Column not found`)
    }

    board.columnsId = arrayUtils.moveElementToIndex(
      [...board.columnsId],
      columnId,
      toPosition
    )

    await this.pubsubService.boardDatablocksUpdated([
      this.boardService.formatToBoardDataBlock(board.toObject())
    ])

    await board.save()
    return true
  }
  //#endregion
}
