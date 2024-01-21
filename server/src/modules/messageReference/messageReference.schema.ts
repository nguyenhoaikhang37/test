import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

export enum MessageReferenceType {
  Channel = 'C',
  Group = 'G',
  Personal = 'P'
}

registerEnumType(MessageReferenceType, {
  name: 'MessageReferenceType'
})

export enum MessageReferenceMemberRole {
  Admin = 'A',
  Member = 'M'
}

registerEnumType(MessageReferenceMemberRole, {
  name: 'MessageReferenceMemberRole'
})

@ObjectType()
@Schema()
export class MessageReferenceMember {
  _id: string

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: string

  @Prop({
    default: MessageReferenceMemberRole.Member
  })
  role: MessageReferenceMemberRole
}

export const MessageReferenceMemberSchema = SchemaFactory.createForClass(
  MessageReferenceMember
)

@ObjectType()
@Schema()
export class MessageReference {
  _id: string

  @Prop()
  title: string

  @Prop()
  description?: string

  @Prop({
    default: MessageReferenceType.Channel
  })
  messageReferenceType: MessageReferenceType

  @Prop({ type: Types.ObjectId, ref: 'Team' })
  teamId?: string

  @Prop({ type: Types.ObjectId, ref: 'Message' })
  pinId?: string

  @Field(() => [MessageReferenceMember])
  @Prop({ type: [MessageReferenceMemberSchema] })
  members: MessageReferenceMember[]

  @Prop({ type: Boolean, default: true })
  isPublic?: boolean

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

export const MessageReferenceSchema =
  SchemaFactory.createForClass(MessageReference)
