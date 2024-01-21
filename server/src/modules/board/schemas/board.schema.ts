import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { FieldProperty, FieldPropertySchema } from './field.schema'
import { GroupPermission, GroupPermissionSchema } from './group.schema'

@ObjectType()
@Schema()
export class Board {
  _id: string

  @Prop({ required: true })
  title: string

  @Prop()
  description?: string

  @Prop({ type: Types.ObjectId, ref: 'Team' })
  teamId?: string

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Column' }] })
  columnsId: string[]

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  ownersId: string[]

  @Prop({ type: [FieldPropertySchema] })
  properties: FieldProperty[]

  @Field(() => [GroupPermission], { nullable: true })
  @Prop({ type: [GroupPermissionSchema] })
  groupPermission?: GroupPermission[]

  @Prop({ type: Boolean, default: false })
  isTemplate?: boolean

  @Prop({ type: Boolean, default: false })
  isPublicTemplate?: boolean

  // common
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

export const BoardSchema = SchemaFactory.createForClass(Board)
