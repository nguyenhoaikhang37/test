import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { getUserIdFromContext } from 'src/utils'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { WorkspaceInfoBlock, WorkspaceInfoBlockUnion } from '../common'
import { LoggedUserOutput, User } from './schemas/user.schema'
import { CreateUserInput, LoginUserInput, UpdateUserInput } from './user.input'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput)
  }

  @Query(() => User, { name: 'user' })
  async findOneUser(@Args('id') id: string) {
    return this.userService.findById(id)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput._id, updateUserInput)
  }

  @Mutation(() => LoggedUserOutput)
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.userService.loginUser(loginUserInput)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  async getMyProfileInfo(@Context() context): Promise<User> {
    return this.userService.findById(getUserIdFromContext(context))
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [WorkspaceInfoBlockUnion])
  async getUserData(@Context() context): Promise<WorkspaceInfoBlock[]> {
    return this.userService.getUserData(getUserIdFromContext(context))
  }
}
