import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { cleanObj } from 'src/utils'
import { TypeIds } from '../common.types'
import { MessageInput, UpdateMessageInput } from './message.input'
import { Message } from './message.schema'

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>
  ) {}

  async findById(parentId: string): Promise<Message> {
    return this.messageModel.findById(parentId)
  }

  async findByParentId(parentId: string): Promise<Message[]> {
    return this.messageModel.find({ parentId })
  }

  async findByMessagesId(messagesId: string[]): Promise<Message[]> {
    return this.messageModel.find({ _id: { $in: messagesId } })
  }

  async findByRootId(rootId: string): Promise<Message[]> {
    const regexPattern = new RegExp(`${rootId}`)
    return await this.messageModel
      .find({
        ancestorPath: { $regex: regexPattern }
      })
      .lean()
  }

  async createMessage({
    parentId,
    userId,
    ...data
  }: MessageInput & TypeIds<'userId' | 'parentId'>): Promise<boolean> {
    const message = await this.messageModel.create({
      ...data,
      createdById: userId,
      parentId
    })

    return !!message
  }

  async updateMessage({
    messageId,
    userId,
    ...data
  }: UpdateMessageInput & TypeIds<'messageId' | 'userId'>): Promise<boolean> {
    const message = await this.messageModel.findByIdAndUpdate(
      messageId,
      { updatedAt: new Date(), modifiedById: userId, ...cleanObj(data) },
      { new: true }
    )
    if (!message) {
      throw new NotFoundException('Message not found')
    }
    return true
  }

  async deleteMessage({
    messageId,
    userId
  }: TypeIds<'messageId' | 'userId'>): Promise<boolean> {
    const message = await this.messageModel.findByIdAndUpdate(
      messageId,
      { isAvailable: false, updatedAt: new Date(), modifiedById: userId },
      { new: true }
    )
    if (!message) {
      throw new NotFoundException('Message not found')
    }
    return true
  }
}
