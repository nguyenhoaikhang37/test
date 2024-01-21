import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { getUserIdFromContext } from 'src/utils'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import {
  ChecklistInput,
  ChecklistItemInput,
  UpdateChecklistInput,
  UpdateChecklistItemInput
} from './checklist.input'
import { ChecklistService } from './checklist.service'
import { Checklist } from './schemas/checklist.schema'

@Resolver(() => Checklist)
export class ChecklistResolver {
  constructor(private readonly checklistService: ChecklistService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async createChecklist(
    @Context() context,
    @Args('input') input: ChecklistInput,
    @Args('cardId') cardId: string,
    @Args('boardId') boardId: string
  ): Promise<boolean> {
    return this.checklistService.createChecklist({
      createdById: getUserIdFromContext(context),
      cardId,
      boardId,
      ...input
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async updateChecklist(
    @Context() context,
    @Args('input') input: UpdateChecklistInput,
    @Args('checklistId') checklistId: string
  ): Promise<boolean> {
    return this.checklistService.updateChecklist({
      modifiedById: getUserIdFromContext(context),
      checklistId: checklistId,
      ...input
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteChecklist(
    @Context() context,
    @Args('checklistId') checklistId: string
  ): Promise<boolean> {
    return this.checklistService.deleteChecklist({
      checklistId,
      modifiedById: getUserIdFromContext(context)
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async createChecklistItem(
    @Context() context,
    @Args('checklistId') checklistId: string,
    @Args('item') item: ChecklistItemInput
  ): Promise<boolean> {
    await this.checklistService.createChecklistItem({
      checklistId,
      modifiedById: getUserIdFromContext(context),
      ...item
    })
    return true
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async updateChecklistItems(
    @Context() context,
    @Args('checklistId') checklistId: string,
    @Args('items', { type: () => [UpdateChecklistItemInput] })
    items: UpdateChecklistItemInput[]
  ): Promise<boolean> {
    await this.checklistService.updateChecklistItems({
      checklistId,
      modifiedById: getUserIdFromContext(context),
      items
    })
    return true
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteChecklistItems(
    @Context() context,
    @Args('checklistId') checklistId: string,
    @Args('itemsId', { type: () => [String] }) itemsId: string[]
  ): Promise<boolean> {
    await this.checklistService.deleteChecklistItems({
      checklistId,
      modifiedById: getUserIdFromContext(context),
      itemsId
    })
    return true
  }
}
