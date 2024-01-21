import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { assign, omitBy } from 'lodash'
import { Model } from 'mongoose'
import { cleanObj } from 'src/utils'
import { WorkspaceInfoBlock } from '../common'
import { TypeIds } from '../common.types'
import { PubSubService } from '../pubsub/pubsub.service'
import {
  CreateTeamInput,
  CreateTeamMemberInput,
  UpdateTeamInput,
  UpdateTeamMemberInput
} from './team.input'
import { Team, TeamMemberRole } from './team.schema'

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<Team>,
    private readonly pubsubService: PubSubService
  ) {}

  async findTeamById(teamId: string) {
    const team = await this.teamModel.findById(teamId)
    if (!team) {
      throw new NotFoundException(`Team with id ${teamId} not found`)
    }
    return team
  }

  async findTeamsByUserId(userId: string) {
    const teams = await this.teamModel
      .find({
        'members.userId': userId
      })
      .lean()

    return teams
  }

  fortmatToWorkspaceBlock = (team: Team) => {
    return {
      ...team,
      _blockType: 'Team',
      _usersId: team.members?.map(e => e.userId)
    } as WorkspaceInfoBlock
  }

  async teamUpdated(team: Team) {
    this.pubsubService.workspaceInfoBlocksUpdated([
      this.fortmatToWorkspaceBlock(team)
    ])
  }

  async createTeam({
    createdById,
    ...data
  }: CreateTeamInput & TypeIds<'createdById'>) {
    const team = await this.teamModel.create({
      ...data,
      createdById,
      members: [
        {
          role: TeamMemberRole.Admin,
          userId: createdById
        }
      ]
    })

    this.teamUpdated(team.toObject())
    return team
  }

  async updateTeam({
    teamId,
    modifiedById,
    ...data
  }: UpdateTeamInput & TypeIds<'modifiedById' | 'teamId'>) {
    const team = await this.findTeamById(teamId)

    if (
      team.members.find(member => member.userId == modifiedById).role ==
      TeamMemberRole.Admin
    ) {
      //trả về lỗi không có quyền truy cập
    }

    assign(team, {
      ...omitBy(cleanObj(data), value => value == undefined),
      modifiedById,
      updatedAt: new Date()
    })

    await team.save()

    this.teamUpdated(team.toObject())
    return team
  }

  async deleteTeam({
    teamId,
    modifiedById
  }: TypeIds<'modifiedById' | 'teamId'>) {
    const team = await this.findTeamById(teamId)
    assign(team, { isAvailable: false, modifiedById, updatedAt: new Date() })
    await team.save()

    this.teamUpdated(team.toObject())
    return team
  }

  async addTeamMembers({
    modifiedById,
    teamId,
    members
  }: { members: CreateTeamMemberInput[] } & TypeIds<
    'modifiedById' | 'teamId'
  >) {
    const team = await this.findTeamById(teamId)
    team.members.push(...(members as any))
    assign(team, { modifiedById, updatedAt: new Date() })
    await team.save()

    this.teamUpdated(team.toObject())
    return team
  }

  async updateTeamMembers({
    modifiedById,
    teamId,
    members
  }: { members: UpdateTeamMemberInput[] } & TypeIds<
    'modifiedById' | 'teamId'
  >) {
    const team = await this.findTeamById(teamId)
    for (const updatedMember of members) {
      const existingMember = team.members.find(
        member => member._id == updatedMember._id
      )
      if (existingMember) {
        assign(
          existingMember,
          omitBy(cleanObj(updatedMember), value => value == undefined)
        )
      }
    }
    assign(team, { modifiedById, updatedAt: new Date() })
    await team.save()

    this.teamUpdated(team.toObject())
    return team
  }

  async deleteTeamMembers({
    modifiedById,
    teamId,
    membersId
  }: { membersId: string[] } & TypeIds<'modifiedById' | 'teamId'>) {
    const team = await this.findTeamById(teamId)
    team.members = team.members.filter(
      member => !membersId.includes(member._id)
    )
    assign(team, { modifiedById, updatedAt: new Date() })
    await team.save()

    this.teamUpdated(team.toObject())
    return team
  }
}
