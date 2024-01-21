import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import GraphQLJSON from 'graphql-type-json'
import { Types } from 'mongoose'

@ObjectType()
@Schema()
export class Card {
  _id: string

  @Prop()
  title: string

  @Prop()
  description?: string

  @Prop({ type: Types.ObjectId })
  parentId: string

  @Prop({ type: Object })
  @Field(() => GraphQLJSON, { nullable: true })
  fieldsData: { [key: string]: string | string[] | number }

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

export const CardSchema = SchemaFactory.createForClass(Card)
