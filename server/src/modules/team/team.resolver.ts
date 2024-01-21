import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql'
import { getUserIdFromContext } from 'src/utils'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import {
  CreateTeamInput,
  CreateTeamMemberInput,
  UpdateTeamInput,
  UpdateTeamMemberInput
} from './team.input'
import { Team } from './team.schema'
import { TeamService } from './team.service'

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Team])
  async teams(@Context() context) {
    return this.teamService.findTeamsByUserId(getUserIdFromContext(context))
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Team)
  async createTeam(
    @Context() context,
    @Args('teamInput') data: CreateTeamInput
  ) {
    return this.teamService.createTeam({
      ...data,
      createdById: getUserIdFromContext(context)
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Team)
  async updateTeam(
    @Context() context,
    @Args('teamId') teamId: string,
    @Args('teamInput') data: UpdateTeamInput
  ) {
    return this.teamService.updateTeam({
      modifiedById: getUserIdFromContext(context),
      teamId,
      ...data
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Team)
  async deleteTeam(@Context() context, @Args('teamId') teamId: string) {
    return this.teamService.deleteTeam({
      modifiedById: getUserIdFromContext(context),
      teamId
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Team)
  async addTeamMembers(
    @Context() context,
    @Args('teamId') teamId: string,
    @Args('members', { type: () => [CreateTeamMemberInput] })
    members: CreateTeamMemberInput[]
  ) {
    return this.teamService.addTeamMembers({
      modifiedById: getUserIdFromContext(context),
      teamId,
      members
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Team)
  async updateTeamMembers(
    @Context() context,
    @Args('teamId') teamId: string,
    @Args('members', { type: () => [UpdateTeamMemberInput] })
    members: UpdateTeamMemberInput[]
  ) {
    return this.teamService.updateTeamMembers({
      modifiedById: getUserIdFromContext(context),
      teamId,
      members
    })
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Team)
  async deleteTeamMembers(
    @Context() context,
    @Args('teamId') teamId: string,
    @Args('membersId', { type: () => [String] }) membersId: string[]
  ) {
    return this.teamService.deleteTeamMembers({
      modifiedById: getUserIdFromContext(context),
      teamId,
      membersId
    })
  }
}
