import { UseGuards } from '@nestjs/common'
import {
  Args,
  Context,
  Mutation,
  Parent,
  ResolveField,
  Resolver
} from '@nestjs/graphql'
import { getUserIdFromContext } from 'src/utils'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ChecklistService } from '../checklist/checklist.service'
import { Checklist } from '../checklist/schemas/checklist.schema'
import { Comment } from '../comment/comment.schema'
import { CommentService } from '../comment/comment.service'
import { CreateCardInput, UpdateCardInput } from './card.input'
import { Card } from './card.schema'
import { CardService } from './card.service'

@Resolver(() => Card)
export class CardResolver {
  constructor(
    private readonly cardService: CardService,
    private readonly commentService: CommentService,
    private readonly checklistService: ChecklistService
  ) {}

  //#region Card
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async createCard(
    @Context() context,
    @Args('columnId') columnId: string,
    @Args('cardInput') data: CreateCardInput
  ) {
    return this.cardService.createCard({
      createdById: getUserIdFromContext(context),
      columnId,
      ...data
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Card)
  async updateCard(
    @Context() context,
    @Args('cardId') cardId: string,
    @Args('cardInput') data: UpdateCardInput
  ) {
    return this.cardService.updateCard({
      modifiedById: getUserIdFromContext(context),
      cardId,
      ...data
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async updateCardPosition(
    @Context() context,
    @Args('cardId') cardId: string,
    @Args('fromColumnId') fromColumnId: string,
    @Args('toColumnId') toColumnId: string,
    @Args('toPosition') toPosition: number
  ) {
    return this.cardService.updateCardPosition({
      modifiedById: getUserIdFromContext(context),
      cardId,
      fromColumnId,
      toColumnId,
      toPosition
    })
  }
  //#endregion

  //#region ResolveField
  @ResolveField(() => [Comment])
  async comments(@Parent() card: Card): Promise<Comment[]> {
    return this.commentService.findByParentId(card._id)
  }

  @ResolveField(() => [Checklist])
  async checklists(@Parent() card: Card): Promise<Checklist[]> {
    return this.checklistService.findByParentId(card._id)
  }
  //#endregion
}
