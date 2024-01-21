import { InputType } from '@nestjs/graphql'
import { TeamMemberRole } from './team.schema'
@InputType()
export class CreateTeamInput {
  title: string
  description?: string
}

@InputType()
export class UpdateTeamInput {
  title?: string
  description?: string
}

@InputType()
export class CreateTeamMemberInput {
  userId: string
  role?: TeamMemberRole
}

@InputType()
export class UpdateTeamMemberInput {
  _id: string
  role: TeamMemberRole
}
