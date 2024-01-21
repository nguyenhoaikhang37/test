import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { assign } from 'lodash'
import { Model } from 'mongoose'
import { cleanObj } from 'src/utils'
import { CardService } from '../card/card.service'
import { ChecklistService } from '../checklist/checklist.service'
import { ColumnService } from '../column/column.service'
import { CommentService } from '../comment/comment.service'
import { BoardDataBlock, WorkspaceInfoBlock } from '../common'
import { TypeIds } from '../common.types'
import { PubSubService } from '../pubsub/pubsub.service'
import { UserService } from '../user/user.service'
import { BoardInput, UpdateBoardInput } from './inputs/board.input'
import { FieldInput, UpdateFieldInput } from './inputs/field.input'
import { GroupInput, UpdateGroupInput } from './inputs/group.input'
import { Board } from './schemas/board.schema'
import { BoardAction } from './schemas/group.schema'

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<Board>,
    @Inject(forwardRef(() => ColumnService))
    private readonly columnService: ColumnService,
    private readonly cardService: CardService,
    private readonly checklistService: ChecklistService,
    private readonly commentService: CommentService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly pubsubService: PubSubService
  ) {}

  async findById(boardId: string): Promise<Board> {
    return this.boardModel.findById(boardId).lean()
  }

  private _checkPermission = (
    board: Board,
    userId: string,
    action?: BoardAction
  ) => {
    let userActions: BoardAction[] = []
    board.groupPermission.forEach(group => {
      if (group.usersId.includes(userId)) {
        userActions = [...userActions, ...group.boardActions]
      }
    })
    return (
      (action
        ? userActions.includes(action)
        : board.groupPermission.some(group =>
            group.usersId.includes(userId)
          )) || board.ownersId.includes(userId)
    )
  }

  formatToWorkspaceBlock = (board: Board): WorkspaceInfoBlock => {
    let _usersId: string[] = board.ownersId.map(e => e.toString())
    board.groupPermission?.forEach(group => {
      _usersId.push(...group.usersId)
    })

    console.log(_usersId)

    return {
      ...board,
      _blockType: 'Board',
      _usersId
    }
  }

  formatToBoardDataBlock = (board: Board): BoardDataBlock => {
    return {
      ...board,
      _blockType: 'Board'
    }
  }

  //#region query
  async getFlatBoardById({ boardId, userId }: TypeIds<'boardId' | 'userId'>) {
    const board = await this.boardModel.findById(boardId)
    if (!board) {
      throw new NotFoundException(`Board with id ${boardId} not found`)
    }

    const hasPermission = this._checkPermission(board, userId)
    if (!hasPermission) {
      throw new ForbiddenException(`You do not have permission`)
    }

    const columns = await this.columnService.findByRootId(boardId)
    const cards = await this.cardService.findByRootId(boardId)
    const checklists = await this.checklistService.findByRootId(boardId)
    const comments = await this.commentService.findByRootId(boardId)

    const blocks: BoardDataBlock[] = [
      this.formatToBoardDataBlock(board.toObject()),
      ...columns.map(e => this.columnService.formatToBoardDataBlock(e)),
      ...cards.map(e => this.cardService.formatToBoardDataBlock(e)),
      ...checklists.map(e => this.checklistService.formatToBoardDataBlock(e)),
      ...comments.map(e => this.commentService.formatToBoardDataBlock(e))
    ]

    return blocks || []
  }

  async getBoardsByUserId({ userId }: TypeIds<'userId'>): Promise<Board[]> {
    const boards = await this.boardModel
      .find({
        $or: [
          { 'groupPermission.usersId': { $in: [userId] } },
          { ownersId: { $in: [userId] } }
        ]
      })
      .lean()
    return boards
  }

  //#endregion

  async createBoard({
    createdById,
    ...data
  }: BoardInput & TypeIds<'createdById'>): Promise<Board> {
    const createdBoard = await this.boardModel.create({
      ...data,
      ownersId: [createdById],
      createdById
    })

    this.pubsubService.workspaceInfoBlocksUpdated([
      this.formatToWorkspaceBlock(createdBoard.toObject())
    ])

    return createdBoard
  }

  async updateBoardInfo({
    boardId,
    modifiedById,
    ...data
  }: UpdateBoardInput & TypeIds<'modifiedById' | 'boardId'>) {
    const board = await this.boardModel.findById(boardId)
    if (!board) {
      throw new NotFoundException(`Board with id ${boardId} not found`)
    }

    assign(board, { ...cleanObj(data), modifiedById, updatedAt: new Date() })
    board.save()

    return !!board
  }

  //#region Group
  async addBoardGroup({
    boardId,
    modifiedById,
    ...group
  }: GroupInput & TypeIds<'modifiedById' | 'boardId'>) {
    const board = await this.boardModel.findById(boardId)
    if (!board) {
      throw new NotFoundException(`Board with id ${boardId} not found`)
    }
    if (!board.ownersId.includes(modifiedById)) {
      throw new ForbiddenException(
        `You do not have permission to add groups to this board`
      )
    }
    const usersIdValid = (
      await this.userService.findByUsersId(group.usersId)
    ).map(e => e._id)
    board.groupPermission.push({
      ...(group as any),
      usersId: usersIdValid
    })
    board.updatedAt = new Date()
    board.modifiedById = modifiedById
    await board.save()
    return true
  }

  async deleteBoardGroup({
    boardId,
    modifiedById,
    groupId
  }: TypeIds<'modifiedById' | 'boardId' | 'groupId'>) {
    const board = await this.boardModel.findById(boardId)
    if (!board) {
      throw new NotFoundException(`Board with id ${boardId} not found`)
    }
    if (!board.ownersId.includes(modifiedById)) {
      throw new ForbiddenException(
        `You do not have permission to add groups to this board`
      )
    }

    board.groupPermission = board.groupPermission.filter(
      group => group._id != groupId
    )

    board.updatedAt = new Date()
    board.modifiedById = modifiedById

    await board.save()
    return true
  }

  async editBoardGroup({
    boardId,
    modifiedById,
    ...group
  }: UpdateGroupInput & TypeIds<'modifiedById' | 'boardId'>) {
    const board = await this.boardModel.findById(boardId)
    if (!board) {
      throw new NotFoundException(`Board with id ${boardId} not found`)
    }
    const hasPermission = this._checkPermission(
      board,
      modifiedById,
      BoardAction.EditGroup
    )
    if (!hasPermission) {
      throw new ForbiddenException(
        `You do not have permission to edit this group`
      )
    }
    const usersIdValid = (
      await this.userService.findByUsersId(group.usersId)
    ).map(e => e._id)

    board.groupPermission = board.groupPermission.map(_group =>
      _group._id == group._id
        ? {
            ..._group,
            ...(cleanObj(group) as any),
            usersId: usersIdValid
          }
        : _group
    )

    board.updatedAt = new Date()
    board.modifiedById = modifiedById

    await board.save()
    return true
  }
  //#endregion

  //#region Field
  async addBoardField({
    boardId,
    modifiedById,
    ...field
  }: FieldInput & TypeIds<'modifiedById' | 'boardId'>) {
    const board = await this.boardModel.findById(boardId)
    if (!board) {
      throw new NotFoundException(`Board with id ${boardId} not found`)
    }
    const hasPermission = this._checkPermission(
      board,
      modifiedById,
      BoardAction.EditProperty
    )
    if (!hasPermission) {
      throw new ForbiddenException(
        `You do not have permission to edit this field`
      )
    }

    board.properties.push({
      ...(field as any)
    })

    board.updatedAt = new Date()
    board.modifiedById = modifiedById
    await board.save()

    this.pubsubService.boardDatablocksUpdated([
      this.formatToBoardDataBlock(board.toObject())
    ])
    return true
  }

  async deleteBoardField({
    boardId,
    modifiedById,
    fieldId
  }: TypeIds<'modifiedById' | 'boardId' | 'fieldId'>) {
    const board = await this.boardModel.findById(boardId)
    if (!board) {
      throw new NotFoundException(`Board with id ${boardId} not found`)
    }
    const hasPermission = this._checkPermission(
      board,
      modifiedById,
      BoardAction.EditProperty
    )
    if (!hasPermission) {
      throw new ForbiddenException(
        `You do not have permission to delete this field`
      )
    }

    board.properties = board.properties.filter(field => field._id != fieldId)

    board.updatedAt = new Date()
    board.modifiedById = modifiedById

    await board.save()
    return true
  }

  async editBoardField({
    boardId,
    modifiedById,
    ...field
  }: UpdateFieldInput & TypeIds<'modifiedById' | 'boardId'>) {
    const board = await this.boardModel.findById(boardId)
    if (!board) {
      throw new NotFoundException(`Board with id ${boardId} not found`)
    }
    const hasPermission = this._checkPermission(
      board,
      modifiedById,
      BoardAction.EditProperty
    )
    if (!hasPermission) {
      throw new ForbiddenException(
        `You do not have permission to edit this field`
      )
    }

    board.properties = board.properties.map(_field =>
      _field._id == field._id
        ? {
            ..._field,
            ...(cleanObj(field) as any)
          }
        : _field
    )

    board.updatedAt = new Date()
    board.modifiedById = modifiedById

    await board.save()
    return true
  }
  //#endregion
}
