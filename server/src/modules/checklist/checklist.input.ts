import { InputType } from '@nestjs/graphql'

@InputType()
export class ChecklistInput {
  title: string
}

@InputType()
export class UpdateChecklistInput {
  title?: string
}

@InputType()
export class ChecklistItemInput {
  title: string
  isCheck?: boolean
}

@InputType()
export class UpdateChecklistItemInput {
  _id: string
  title?: string
  isCheck?: boolean
}
