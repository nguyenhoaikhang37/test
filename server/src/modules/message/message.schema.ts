import { ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

@ObjectType()
@Schema()
export class Message {
  _id: string

  @Prop({ required: true })
  content: string

  @Prop({ type: Types.ObjectId, ref: 'MessageReference' })
  messageReferenceId: string

  @Prop({ type: [{ type: String }] })
  attachments?: string[]

  @Prop({ type: Types.ObjectId, ref: 'Message' })
  replyToMessageId?: string

  //Common
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

export const MessageSchema = SchemaFactory.createForClass(Message)
