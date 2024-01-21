import { InputType, OmitType, PartialType } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  userName: string

  email: string

  nickname: string

  avatar: string

  password: string
}

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['password'])
) {
  _id: string
}

@InputType()
export class LoginUserInput {
  email: string

  password: string
}
