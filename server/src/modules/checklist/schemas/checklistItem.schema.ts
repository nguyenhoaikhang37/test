import { ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@ObjectType()
@Schema()
export class ChecklistItem {
  _id: string

  @Prop({ default: 'ChecklistItem title' })
  title: string

  @Prop({ default: false })
  isCheck: boolean
}

export const ChecklistItemSchema = SchemaFactory.createForClass(ChecklistItem)
