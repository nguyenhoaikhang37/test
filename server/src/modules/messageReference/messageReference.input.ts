import { InputType } from '@nestjs/graphql'
import {
  MessageReferenceMemberRole,
  MessageReferenceType
} from './messageReference.schema'

@InputType()
export class CreateMessageReferenceInput {
  title: string
  description?: string
  messageReferenceType: MessageReferenceType
  members?: CreateMessageReferenceMemberInput[]
  teamId?: string
}

@InputType()
export class UpdateMessageReferenceInput {
  title?: string
  description?: string
}

@InputType()
export class CreateMessageReferenceMemberInput {
  userId: string
  role?: MessageReferenceMemberRole
}

@InputType()
export class UpdateMessageReferenceMemberInput {
  _id: string
  role: MessageReferenceMemberRole
}

@InputType()
export class CreateChannelInput {
  title: string
  teamId: string
  isPublic?: boolean
  description?: string
  members?: CreateMessageReferenceMemberInput[]
}

@InputType()
export class UpdateChannelInput {
  title?: string
  isPublic?: boolean
  description?: string
  members?: CreateMessageReferenceMemberInput[]
}

@InputType()
export class CreateGroupInput {
  title: string
  description?: string
  members: CreateMessageReferenceMemberInput[]
}

@InputType()
export class CreateDriectMessInput {
  sendTo: string
}
