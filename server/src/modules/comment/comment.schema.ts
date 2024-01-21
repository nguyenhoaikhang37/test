import { ObjectType, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

export enum CommentTo {
  Card = 'card',
  Comment = 'comment'
}

registerEnumType(CommentTo, {
  name: 'CommentTo'
})

@ObjectType()
@Schema()
export class Comment {
  _id: string

  @Prop({ required: true })
  content: string

  @Prop({ type: Types.ObjectId })
  parentId: string

  @Prop({
    default: CommentTo.Card
  })
  commentTo: CommentTo

  @Prop()
  ancestorPath: string

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdById: string

  @Prop({ type: Types.ObjectId, ref: 'User' })
  modifiedById?: string

  @Prop({ default: Date.now })
  createdAt: Date

  @Prop()
  updatedAt?: Date

  @Prop({ default: true })
  isAvailable: boolean
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
