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

import { Card } from '../card/card.schema'
import { CardService } from '../card/card.service'
import { CreateColumnInput, UpdateColumnInput } from './column.input'
import { Column } from './column.schema'
import { ColumnService } from './column.service'

@Resolver(() => Column)
export class ColumnResolver {
  constructor(
    private readonly columnService: ColumnService,
    private readonly cardService: CardService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async createColumn(
    @Context() context,
    @Args('boardId') boardId: string,
    @Args('columnInput')
    data: CreateColumnInput
  ) {
    return this.columnService.createColumn({
      ...data,
      createdById: getUserIdFromContext(context),
      boardId
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async updateColumn(
    @Context() context,
    @Args('columnId') columnId: string,
    @Args('columnInput')
    data: UpdateColumnInput
  ) {
    return this.columnService.updateColumn({
      ...data,
      modifiedById: getUserIdFromContext(context),
      columnId
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async updateColumnPosition(
    @Context() context,
    @Args('boardId') boardId: string,
    @Args('columnId') columnId: string,
    @Args('toPosition') toPosition: number
  ) {
    return this.columnService.updateColumnPosition({
      modifiedById: getUserIdFromContext(context),
      boardId,
      columnId,
      toPosition
    })
  }

  //Nested query
  @ResolveField(() => [Card])
  async cards(@Parent() column: Column): Promise<Card[]> {
    return this.cardService.findCardsByCardsId(column.cardsId)
  }
}
