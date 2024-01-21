import { HideField, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

@ObjectType()
@Schema()
export class Column {
  _id: string

  @Prop()
  title: string

  @Prop({ type: Types.ObjectId })
  parentId: string

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Card' }] })
  cardsId: string[]

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

export const ColumnSchema = SchemaFactory.createForClass(Column)
