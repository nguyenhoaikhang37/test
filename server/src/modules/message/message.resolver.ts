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
import { MessageInput, UpdateMessageInput } from './message.input'
import { Message } from './message.schema'
import { MessageService } from './message.service'

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService
  ) {}

  @ResolveField(() => [Message])
  async messages(@Parent() message: Message): Promise<Message[]> {
    return this.messageService.findByParentId(message._id)
  }

  @ResolveField(() => User)
  async createdBy(@Parent() message: Message): Promise<User> {
    return this.userService.findById(message.createdById)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async createMessage(
    @Context() context,
    @Args('input') input: MessageInput,
    @Args('parentId') parentId: string
  ): Promise<boolean> {
    return this.messageService.createMessage({
      userId: getUserIdFromContext(context),
      ...input,
      parentId
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async updateMessage(
    @Context() context,
    @Args('input') input: UpdateMessageInput
  ): Promise<boolean> {
    return this.messageService.updateMessage({
      userId: getUserIdFromContext(context),
      messageId: '',
      ...input
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteMessage(
    @Context() context,
    @Args('messageId') messageId: string
  ): Promise<boolean> {
    return this.messageService.deleteMessage({
      messageId,
      userId: getUserIdFromContext(context)
    })
  }
}
