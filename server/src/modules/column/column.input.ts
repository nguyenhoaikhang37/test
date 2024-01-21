import { InputType } from '@nestjs/graphql'

@InputType()
export class CreateColumnInput {
  title: string
}

@InputType()
export class UpdateColumnInput {
  title?: string
}
