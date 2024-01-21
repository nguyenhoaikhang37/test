import { UseGuards } from '@nestjs/common'
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql'
import { getUserIdFromContext } from 'src/utils'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { BoardDataBlock, BoardDataBlockUnion } from '../../common'
import { User } from '../../user/schemas/user.schema'
import { UserService } from '../../user/user.service'
import { BoardService } from '../board.service'
import { BoardInput, UpdateBoardInput } from '../inputs/board.input'
import { FieldInput, UpdateFieldInput } from '../inputs/field.input'
import { GroupInput, UpdateGroupInput } from '../inputs/group.input'
import { Board } from '../schemas/board.schema'

@Resolver(() => Board)
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService,
    private readonly userService: UserService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Board], { name: 'boards' })
  async boards(@Context() context): Promise<Board[]> {
    return this.boardService.getBoardsByUserId({
      userId: getUserIdFromContext(context)
    })
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [BoardDataBlockUnion])
  async flatBoard(
    @Context() context,
    @Args('boardId') boardId: string
  ): Promise<BoardDataBlock[]> {
    return this.boardService.getFlatBoardById({
      boardId,
      userId: getUserIdFromContext(context)
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Board)
  async createBoard(
    @Context() context,
    @Args('boardInput') data: BoardInput
  ): Promise<Board> {
    return this.boardService.createBoard({
      createdById: getUserIdFromContext(context),
      ...data
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async updateBoard(
    @Context() context,
    @Args('boardId') boardId: string,
    @Args('boardInput') data: UpdateBoardInput
  ): Promise<boolean> {
    return this.boardService.updateBoardInfo({
      boardId,
      modifiedById: getUserIdFromContext(context),
      ...data
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async addBoardGroup(
    @Context() context,
    @Args('boardId') boardId: string,
    @Args('groupInput') data: GroupInput
  ): Promise<boolean> {
    return this.boardService.addBoardGroup({
      boardId,
      modifiedById: getUserIdFromContext(context),
      ...data
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteBoardGroup(
    @Context() context,
    @Args('boardId') boardId: string,
    @Args('groupId') groupId: string
  ): Promise<boolean> {
    return this.boardService.deleteBoardGroup({
      boardId,
      modifiedById: getUserIdFromContext(context),
      groupId
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async editBoardGroup(
    @Context() context,
    @Args('boardId') boardId: string,
    @Args('groupInput') data: UpdateGroupInput
  ): Promise<boolean> {
    return this.boardService.editBoardGroup({
      boardId,
      modifiedById: getUserIdFromContext(context),
      ...data
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async addBoardField(
    @Context() context,
    @Args('boardId') boardId: string,
    @Args('fieldInput') data: FieldInput
  ): Promise<boolean> {
    return this.boardService.addBoardField({
      boardId,
      modifiedById: getUserIdFromContext(context),
      ...data
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteBoardField(
    @Context() context,
    @Args('boardId') boardId: string,
    @Args('fieldId') fieldId: string
  ): Promise<boolean> {
    return this.boardService.deleteBoardField({
      boardId,
      modifiedById: getUserIdFromContext(context),
      fieldId
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async editBoardField(
    @Context() context,
    @Args('boardId') boardId: string,
    @Args('fieldInput') data: UpdateFieldInput
  ): Promise<boolean> {
    return this.boardService.editBoardField({
      boardId,
      modifiedById: getUserIdFromContext(context),
      ...data
    })
  }

  //Nested query
  @ResolveField(() => [User])
  async owners(@Parent() board: Board): Promise<User[]> {
    return this.userService.findByUsersId(board.ownersId)
  }
}
