import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { cleanObj } from 'src/utils'
import { CardService } from '../card/card.service'
import { BoardDataBlock } from '../common'
import { TypeIds } from '../common.types'
import { PubSubService } from '../pubsub/pubsub.service'
import { CommentInput, UpdateCommentInput } from './comment.input'
import { Comment, CommentTo } from './comment.schema'

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly cardService: CardService,
    private readonly pubsubService: PubSubService
  ) {}

  async findById(parentId: string): Promise<Comment> {
    return this.commentModel.findById(parentId)
  }

  async findByParentId(parentId: string): Promise<Comment[]> {
    return this.commentModel.find({ parentId })
  }

  async findByCommentsId(commentsId: string[]): Promise<Comment[]> {
    return this.commentModel.find({ _id: { $in: commentsId } })
  }

  async findByRootId(rootId: string): Promise<Comment[]> {
    const regexPattern = new RegExp(`${rootId}`)
    return await this.commentModel
      .find({
        ancestorPath: { $regex: regexPattern }
      })
      .lean()
  }

  formatToBoardDataBlock = (comment: Comment): BoardDataBlock => {
    return {
      ...comment,
      _blockType: 'Comment'
    }
  }

  async createComment({
    parentId,
    userId,
    commentTo,
    ...data
  }: CommentInput & TypeIds<'userId' | 'parentId'>): Promise<boolean> {
    const parent = await (commentTo == CommentTo.Card
      ? this.cardService.findById(parentId)
      : this.findById(parentId))

    const comment = await this.commentModel.create({
      ...data,
      createdById: userId,
      ancestorPath: parent.ancestorPath + '/' + parentId,
      parentId
    })

    await this.pubsubService.boardDatablocksUpdated([
      this.formatToBoardDataBlock(comment.toObject())
    ])

    return true
  }

  async updateComment({
    commentId,
    userId,
    ...data
  }: UpdateCommentInput & TypeIds<'commentId' | 'userId'>): Promise<boolean> {
    const comment = await this.commentModel.findByIdAndUpdate(
      commentId,
      { updatedAt: new Date(), modifiedById: userId, ...cleanObj(data) },
      { new: true }
    )
    if (!comment) {
      throw new NotFoundException('Comment not found')
    }
    return true
  }

  async deleteComment({
    commentId,
    userId
  }: TypeIds<'commentId' | 'userId'>): Promise<boolean> {
    const comment = await this.commentModel.findByIdAndUpdate(
      commentId,
      { isAvailable: false, updatedAt: new Date(), modifiedById: userId },
      { new: true }
    )
    if (!comment) {
      throw new NotFoundException('Comment not found')
    }
    return true
  }
}
