import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

export enum TeamMemberRole {
  Admin = 'A',
  Member = 'M'
}

registerEnumType(TeamMemberRole, {
  name: 'TeamMemberRole'
})

@ObjectType()
@Schema()
export class TeamMember {
  _id: string

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: string

  @Prop({
    default: TeamMemberRole.Member
  })
  role: TeamMemberRole
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember)

@ObjectType()
@Schema()
export class Team {
  _id: string

  @Prop()
  title: string

  @Prop()
  description?: string

  @Prop()
  avatar?: string

  @Field(() => [TeamMember], { nullable: true })
  @Prop({ type: [TeamMemberSchema] })
  members?: TeamMember[]

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdById: string

  @Prop({ type: Types.ObjectId, ref: 'User' })
  modifiedById?: string

  @Prop({ default: Date.now })
  createdAt: Date

  @Prop()
  updatedAt?: Date

  @Prop({ default: true })
  isAvailable: boolean
}

export const TeamSchema = SchemaFactory.createForClass(Team)
