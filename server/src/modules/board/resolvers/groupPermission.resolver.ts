import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { User } from 'src/modules/user/schemas/user.schema'
import { UserService } from 'src/modules/user/user.service'
import { GroupPermission } from '../schemas/group.schema'

@Resolver(GroupPermission)
export class GroupPermissionResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField(() => [User])
  async users(@Parent() groupPermission: GroupPermission): Promise<User[]> {
    const usersIds = groupPermission.usersId
    return this.userService.findByUsersId(usersIds)
  }
}
