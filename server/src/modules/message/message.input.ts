import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class MessageInput {
  content: string

  @Field(() => [String], { nullable: true })
  attachments?: string[]
}

@InputType()
export class UpdateMessageInput {
  content?: string

  @Field(() => [String], { nullable: true })
  attachments?: string[]
}
