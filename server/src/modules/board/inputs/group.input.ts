import { InputType } from '@nestjs/graphql'
import { BoardAction } from '../schemas/group.schema'

@InputType()
export class GroupInput {
  title: string
  usersId: string[]
  boardActions: BoardAction[]
}

@InputType()
export class UpdateGroupInput {
  _id: string
  title?: string
  usersId?: string[]
  boardActions?: BoardAction[]
}
