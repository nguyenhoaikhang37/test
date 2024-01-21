import {
  Args,
  Context,
  Mutation,
  Parent,
  ResolveField,
  Resolver
} from '@nestjs/graphql'

import { UseGuards } from '@nestjs/common'
import { getUserIdFromContext } from 'src/utils'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { User } from '../user/schemas/user.schema'
import { UserService } from '../user/user.service'
import { CommentInput, UpdateCommentInput } from './comment.input'
import { Comment } from './comment.schema'
import { CommentService } from './comment.service'

@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService
  ) {}

  @ResolveField(() => [Comment])
  async comments(@Parent() comment: Comment): Promise<Comment[]> {
    return this.commentService.findByParentId(comment._id)
  }

  @ResolveField(() => User)
  async createdBy(@Parent() comment: Comment): Promise<User> {
    return this.userService.findById(comment.createdById)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async createComment(
    @Context() context,
    @Args('input') input: CommentInput,
    @Args('parentId') parentId: string
  ): Promise<boolean> {
    return this.commentService.createComment({
      userId: getUserIdFromContext(context),
      ...input,
      parentId
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async updateComment(
    @Context() context,
    @Args('input') input: UpdateCommentInput
  ): Promise<boolean> {
    return this.commentService.updateComment({
      userId: getUserIdFromContext(context),
      commentId: '',
      ...input
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteComment(
    @Context() context,
    @Args('commentId') commentId: string
  ): Promise<boolean> {
    return this.commentService.deleteComment({
      commentId,
      userId: getUserIdFromContext(context)
    })
  }
}
