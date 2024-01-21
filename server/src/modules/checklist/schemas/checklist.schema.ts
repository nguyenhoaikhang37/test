import { HideField, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { ChecklistItem, ChecklistItemSchema } from './checklistItem.schema'

export enum ChecklistStatus {
  Check = 'Check',
  UnCheck = 'UnCheck',
  SemiCheck = 'SemiCheck'
}

registerEnumType(ChecklistStatus, {
  name: 'ChecklistStatus'
})

@ObjectType()
@Schema()
export class Checklist {
  _id: string

  @Prop()
  title: string

  @Prop({ type: Types.ObjectId, ref: 'Card' })
  parentId: string

  @Prop({ type: Types.ObjectId, ref: 'Board' })
  boardId: string

  @Prop({ type: [ChecklistItemSchema] })
  items: ChecklistItem[]

  @Prop({ type: Boolean, default: false })
  isCheck: boolean

  // common
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
export const ChecklistSchema = SchemaFactory.createForClass(Checklist)
