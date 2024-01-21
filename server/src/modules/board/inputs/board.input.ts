import { InputType } from '@nestjs/graphql'

@InputType()
export class BoardInput {
  title: string
  teamId?: string
}

@InputType()
export class UpdateBoardInput {
  title?: string
  description?: string
  avatar?: string
}
