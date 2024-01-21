import { ObjectType, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

export enum BoardAction {
  EditBoard = 'CreateBoard',

  CreateCard = 'CreateCard',
  EditCard = 'CreateCard',
  DeleteCard = 'DeleteCard',

  EditProperty = 'EditProperty',
  EditGroup = 'EditGroup',

  CreateComment = 'CreateComment',
  EditComment = 'EditComment',
  DeleteComment = 'DeleteComment'
}

registerEnumType(BoardAction, {
  name: 'BoardAction'
})

@ObjectType()
@Schema()
export class GroupPermission {
  _id: string

  @Prop()
  title: string

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  usersId: string[]

  @Prop({ type: [{ type: String, enum: BoardAction }] })
  boardActions: BoardAction[]
}

export const GroupPermissionSchema =
  SchemaFactory.createForClass(GroupPermission)
