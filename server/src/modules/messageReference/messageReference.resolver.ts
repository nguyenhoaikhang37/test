import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { getUserIdFromContext } from 'src/utils'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import {
  CreateMessageReferenceInput,
  CreateMessageReferenceMemberInput,
  UpdateMessageReferenceInput,
  UpdateMessageReferenceMemberInput
} from './messageReference.input'
import { MessageReference } from './messageReference.schema'
import { MessageReferenceService } from './messageReference.service'

@Resolver(() => MessageReference)
export class MessageReferenceResolver {
  constructor(
    private readonly messageReferenceService: MessageReferenceService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => MessageReference)
  async createMessageReference(
    @Context() context,
    @Args('messageReferenceInput') data: CreateMessageReferenceInput
  ) {
    return this.messageReferenceService.createMessageReference({
      ...data,
      createdById: getUserIdFromContext(context)
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => MessageReference)
  async updateMessageReference(
    @Context() context,
    @Args('messageReferenceId') messageReferenceId: string,
    @Args('messageReferenceInput') data: UpdateMessageReferenceInput
  ) {
    return this.messageReferenceService.updateMessageReference({
      modifiedById: getUserIdFromContext(context),
      messageReferenceId,
      ...data
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => MessageReference)
  async deleteMessageReference(
    @Context() context,
    @Args('messageReferenceId') messageReferenceId: string
  ) {
    return this.messageReferenceService.deleteMessageReference({
      modifiedById: getUserIdFromContext(context),
      messageReferenceId
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => MessageReference)
  async addMessageReferenceMembers(
    @Context() context,
    @Args('messageReferenceId') messageReferenceId: string,
    @Args('members', { type: () => [CreateMessageReferenceMemberInput] })
    members: CreateMessageReferenceMemberInput[]
  ) {
    return this.messageReferenceService.addMessageReferenceMembers({
      modifiedById: getUserIdFromContext(context),
      messageReferenceId,
      members
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => MessageReference)
  async updateMessageReferenceMembers(
    @Context() context,
    @Args('messageReferenceId') messageReferenceId: string,
    @Args('members', { type: () => [UpdateMessageReferenceMemberInput] })
    members: UpdateMessageReferenceMemberInput[]
  ) {
    return this.messageReferenceService.updateMessageReferenceMembers({
      modifiedById: getUserIdFromContext(context),
      messageReferenceId,
      members
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => MessageReference)
  async deleteMessageReferenceMembers(
    @Context() context,
    @Args('messageReferenceId') messageReferenceId: string,
    @Args('membersId', { type: () => [String] }) membersId: string[]
  ) {
    return this.messageReferenceService.deleteMessageReferenceMembers({
      modifiedById: getUserIdFromContext(context),
      messageReferenceId,
      membersId
    })
  }
}
