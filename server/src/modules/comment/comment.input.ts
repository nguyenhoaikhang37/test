import { InputType } from '@nestjs/graphql'
import { CommentTo } from './comment.schema'

@InputType()
export class CommentInput {
  content: string
  commentTo?: CommentTo
}

@InputType()
export class UpdateCommentInput {
  content?: string
}
