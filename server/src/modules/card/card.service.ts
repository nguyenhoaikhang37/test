import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { assign } from 'lodash'
import { Model } from 'mongoose'
import { arrayUtils, cleanObj } from 'src/utils'
import { Column } from '../column/column.schema'
import { ColumnService } from '../column/column.service'
import { BoardDataBlock } from '../common'
import { PubSubService } from '../pubsub/pubsub.service'
import { TypeIds } from './../common.types'
import { CreateCardInput, UpdateCardInput } from './card.input'
import { Card } from './card.schema'

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<Card>,
    @InjectModel(Column.name) private readonly columnModel: Model<Column>,
    private readonly pubsubService: PubSubService,
    private readonly columnService: ColumnService
  ) {}

  async findCardsByCardsId(cardsId: string[]): Promise<Card[]> {
    const cards = await this.cardModel.find({
      _id: { $in: cardsId }
    })

    return cards
  }

  async findById(cardId: string): Promise<Card> {
    return this.cardModel.findById(cardId)
  }

  async findByRootId(rootId: string) {
    const regexPattern = new RegExp(`${rootId}`)
    return await this.cardModel
      .find({
        ancestorPath: { $regex: regexPattern }
      })
      .lean()
  }

  formatToBoardDataBlock = (card: Card): BoardDataBlock => {
    return {
      ...card,
      _blockType: 'Card'
    }
  }

  //#region card
  async createCard({
    columnId,
    createdById,
    ...data
  }: CreateCardInput & TypeIds<'createdById' | 'columnId'>) {
    const column = await this.columnModel.findById(columnId)
    if (!column) {
      throw new NotFoundException(`Column with ID ${columnId} not found`)
    }
    const card = await new this.cardModel({
      ...data,
      ancestorPath: column.ancestorPath,
      // ancestorPath: column.ancestorPath + '/' + columnId,
      parentId: columnId,
      createdById
    })
    await card.save()
    column.cardsId.push(card._id)
    await column.save()

    await this.pubsubService.boardDatablocksUpdated([
      this.formatToBoardDataBlock(card.toObject()),
      this.columnService.formatToBoardDataBlock(column.toObject())
    ])

    return true
  }

  async updateCard({
    cardId,
    modifiedById,
    ...data
  }: UpdateCardInput & TypeIds<'modifiedById' | 'cardId'>) {
    const card = await this.cardModel.findById(cardId)
    if (!card) {
      throw new NotFoundException(`Card with id ${cardId} not found`)
    }

    assign(card, { ...cleanObj(data), modifiedById, updatedAt: new Date() })

    card.save()

    await this.pubsubService.boardDatablocksUpdated([
      this.formatToBoardDataBlock(card.toObject())
    ])

    return card
  }

  async updateCardPosition({
    cardId,
    fromColumnId,
    toColumnId,
    toPosition
  }: { fromColumnId: string; toColumnId: string; toPosition: number } & TypeIds<
    'modifiedById' | 'cardId'
  >) {
    const card = await this.cardModel.findById(cardId)
    if (!card) {
      throw new NotFoundException(`Card with ID ${cardId} not found`)
    }

    if (fromColumnId == toColumnId) {
      const column = await this.columnModel.findById(fromColumnId)

      if (!column) {
        throw new NotFoundException(`Column with ID ${fromColumnId} not found`)
      }

      if (!column.cardsId.includes(cardId)) {
        throw new NotFoundException(
          `Card with ID ${cardId} not found in column`
        )
      }

      column.cardsId = arrayUtils.moveElementToIndex(
        [...column.cardsId],
        cardId,
        toPosition
      )

      await column.save()

      await this.pubsubService.boardDatablocksUpdated([
        this.columnService.formatToBoardDataBlock(column.toObject())
      ])
    } else {
      const fromColumn = await this.columnModel.findById(fromColumnId)
      const toColumn = await this.columnModel.findById(toColumnId)

      if (!fromColumn) {
        throw new NotFoundException(
          `Source column with ID ${fromColumnId} not found`
        )
      }

      if (!toColumn) {
        throw new NotFoundException(
          `Destination column with ID ${toColumnId} not found`
        )
      }

      if (!fromColumn.cardsId.includes(cardId)) {
        throw new NotFoundException(
          `Card with ID ${cardId} not found in source column`
        )
      }

      fromColumn.cardsId = arrayUtils.removeElement(
        [...fromColumn.cardsId],
        cardId
      )

      toColumn.cardsId = arrayUtils.insertElementAtIndex(
        [...toColumn.cardsId],
        cardId,
        toPosition
      )

      await fromColumn.save()
      await toColumn.save()

      await this.pubsubService.boardDatablocksUpdated([
        this.columnService.formatToBoardDataBlock(fromColumn.toObject()),
        this.columnService.formatToBoardDataBlock(toColumn.toObject())
      ])
    }

    return true
  }
  //#endregion
}
