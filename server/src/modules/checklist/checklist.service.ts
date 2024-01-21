import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CardService } from '../card/card.service'
import { BoardDataBlock } from '../common'
import { TypeIds } from '../common.types'
import { PubSubService } from '../pubsub/pubsub.service'
import { cleanObj } from './../../utils/index'
import {
  ChecklistInput,
  ChecklistItemInput,
  UpdateChecklistInput,
  UpdateChecklistItemInput
} from './checklist.input'
import { Checklist } from './schemas/checklist.schema'

@Injectable()
export class ChecklistService {
  constructor(
    @InjectModel(Checklist.name) private checklistModel: Model<Checklist>,
    private readonly cardService: CardService,
    private readonly pubsubService: PubSubService
  ) {}

  async getChecklistsByParentId(parentId: string): Promise<Checklist[]> {
    return this.checklistModel.find({ parentId, isAvailable: true })
  }

  async findById(checklistId: string): Promise<Checklist> {
    return this.checklistModel.findById(checklistId)
  }

  formatToBoardDataBlock = (checklist: Checklist): BoardDataBlock => {
    return {
      ...checklist,
      _blockType: 'Checklist'
    }
  }

  //#region
  async findByChecklistsId(checklistsId: string[]): Promise<Checklist[]> {
    const checklists = await this.checklistModel.find({
      _id: { $in: checklistsId },
      isAvailable: true
    })

    return checklists
  }

  async findByParentId(parentId: string): Promise<Checklist[]> {
    return await this.checklistModel.find({
      parentId,
      isAvailable: true
    })
  }

  async findByRootId(rootId: string) {
    const regexPattern = new RegExp(`${rootId}`)
    return await this.checklistModel
      .find({
        ancestorPath: { $regex: regexPattern }
      })
      .lean()
  }
  //#endregion

  async createChecklist({
    cardId,
    createdById,
    boardId,
    ...data
  }: ChecklistInput &
    TypeIds<'cardId' | 'createdById' | 'boardId'>): Promise<boolean> {
    const card = await this.cardService.findById(cardId)
    if (!card) {
      throw new NotFoundException(`Card with ID ${cardId} not found`)
    }

    const checklist = await this.checklistModel.create({
      ...data,
      boardId,
      parentId: cardId,
      ancestorPath: `${card.ancestorPath}/${cardId}`,
      createdById
    })

    await this.pubsubService.boardDatablocksUpdated([
      this.formatToBoardDataBlock(checklist.toObject())
    ])

    return true
  }

  async updateChecklist({
    checklistId,
    modifiedById,
    ...data
  }: UpdateChecklistInput &
    TypeIds<'checklistId' | 'modifiedById'>): Promise<boolean> {
    const checklist = await this.checklistModel.findById(checklistId)
    if (!checklist) {
      throw new NotFoundException(`Checklist with ID ${checklistId} not found`)
    }

    Object.assign(checklist, {
      ...cleanObj(data),
      modifiedById,
      updatedAt: new Date()
    })

    await checklist.save()
    return true
  }

  async deleteChecklist({
    checklistId,
    modifiedById
  }: TypeIds<'checklistId' | 'modifiedById'>): Promise<boolean> {
    const checklist = await this.checklistModel.findById(checklistId)
    if (!checklist) {
      throw new NotFoundException(`Checklist with ID ${checklistId} not found`)
    }

    Object.assign(checklist, {
      isAvailable: false,
      modifiedById,
      updatedAt: new Date()
    })

    await checklist.save()
    return true
  }

  //#region ChecklistItem
  async createChecklistItem({
    checklistId,
    modifiedById,
    ...data
  }: ChecklistItemInput &
    TypeIds<'checklistId' | 'modifiedById'>): Promise<boolean> {
    const checklist = await this.checklistModel.findById(checklistId)
    if (!checklist) {
      throw new NotFoundException(`Checklist with id ${checklistId} not found`)
    }

    checklist.items.push({ ...(data as any) })
    checklist.modifiedById = modifiedById
    checklist.updatedAt = new Date()

    await checklist.save()

    await this.pubsubService.boardDatablocksUpdated([
      this.formatToBoardDataBlock(checklist.toObject())
    ])

    return true
  }

  async updateChecklistItems({
    checklistId,
    modifiedById,
    items
  }: {
    items: UpdateChecklistItemInput[]
  } & TypeIds<'checklistId' | 'modifiedById'>): Promise<boolean> {
    const checklist = await this.checklistModel.findById(checklistId)
    if (!checklist) {
      throw new NotFoundException(`Checklist with id ${checklistId} not found`)
    }

    checklist.items = checklist.items.map(oldItem => {
      const updateItem = items.find(e => e._id == oldItem._id)
      if (updateItem)
        return {
          ...oldItem,
          ...updateItem
        }
      else return oldItem
    })

    checklist.modifiedById = modifiedById
    checklist.updatedAt = new Date()
    await checklist.save()

    await this.pubsubService.boardDatablocksUpdated([
      this.formatToBoardDataBlock(checklist.toObject())
    ])

    return true
  }

  async deleteChecklistItems({
    checklistId,
    modifiedById,
    itemsId
  }: {
    itemsId: string[]
  } & TypeIds<'checklistId' | 'modifiedById'>): Promise<boolean> {
    const checklist = await this.checklistModel.findById(checklistId)
    if (!checklist) {
      throw new NotFoundException(`Checklist with id ${checklistId} not found`)
    }

    checklist.items = checklist.items.filter(
      item => !itemsId.includes(item._id)
    )

    checklist.modifiedById = modifiedById
    checklist.updatedAt = new Date()

    await checklist.save()
    return true
  }
  //#endregion
}
