import { Field, InputType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
@InputType()
export class CreateCardInput {
  title: string
}

@InputType()
export class UpdateCardInput {
  title?: string
  description?: string
  @Field(() => GraphQLJSON, { nullable: true })
  fieldsData: string | string[] | number
}
