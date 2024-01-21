import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { assign, omitBy } from 'lodash'
import { Model } from 'mongoose'
import { cleanObj } from 'src/utils'
import { WorkspaceInfoBlock } from '../common'
import { TypeIds } from '../common.types'
import { MessageService } from '../message/message.service'
import { PubSubService } from '../pubsub/pubsub.service'
import { TeamMemberRole } from '../team/team.schema'
import { TeamService } from '../team/team.service'
import {
  CreateMessageReferenceInput,
  CreateMessageReferenceMemberInput,
  UpdateMessageReferenceInput,
  UpdateMessageReferenceMemberInput
} from './messageReference.input'
import {
  MessageReference,
  MessageReferenceMemberRole,
  MessageReferenceType
} from './messageReference.schema'

@Injectable()
export class MessageReferenceService {
  constructor(
    @InjectModel(MessageReference.name)
    private readonly messageReferenceModel: Model<MessageReference>,
    private readonly teamService: TeamService,
    private readonly messageService: MessageService,
    private readonly pubsubService: PubSubService
  ) {}

  private async findMessageReferenceById(messageReferenceId: string) {
    const messageReference = await this.messageReferenceModel.findById(
      messageReferenceId
    )
    if (!messageReference) {
      throw new NotFoundException(
        `MessageReference with id ${messageReferenceId} not found`
      )
    }
    return messageReference
  }

  fortmatToWorkspaceBlock = (mess: MessageReference, getUsers?: boolean) => {
    if (
      !getUsers ||
      mess.messageReferenceType !== MessageReferenceType.Channel ||
      !mess.isPublic ||
      !mess.teamId
    )
      return {
        ...mess,
        _blockType: 'MessageReference'
      } as WorkspaceInfoBlock

    return {
      ...mess,
      _blockType: 'MessageReference'
    } as WorkspaceInfoBlock
  }

  async findMessageReferenceByTeamsIdOrUserId({
    userId,
    teamsId
  }: {
    userId: string
    teamsId: string[]
  }) {
    const messageReferences = await this.messageReferenceModel
      .find({
        $or: [{ teamId: { $in: teamsId } }, { 'members.userId': userId }]
      })
      .lean()

    return messageReferences
  }

  async createMessageReference({
    createdById,
    members,
    messageReferenceType,
    teamId,
    ...data
  }: CreateMessageReferenceInput & TypeIds<'createdById'>) {
    switch (messageReferenceType) {
      case MessageReferenceType.Channel: {
        if (teamId) {
          const team = await this.teamService.findTeamById(teamId)
          if (!!team.members.find(member => member.userId == createdById)) {
            const messageReference = await this.messageReferenceModel.create({
              ...data,
              createdById,
              messageReferenceType,
              teamId,
              members: members || [
                {
                  role: MessageReferenceMemberRole.Admin,
                  userId: createdById
                }
              ]
            })

            this.pubsubService.workspaceInfoBlocksUpdated([
              this.fortmatToWorkspaceBlock(messageReference.toObject())
            ])
            return messageReference
          }
        }
      }
      default: {
        const messageReference = await this.messageReferenceModel.create({
          ...data,
          createdById,
          messageReferenceType,
          teamId,
          members: members || [
            {
              role: MessageReferenceMemberRole.Admin,
              userId: createdById
            }
          ]
        })
        this.pubsubService.workspaceInfoBlocksUpdated([
          this.fortmatToWorkspaceBlock(messageReference.toObject())
        ])
        return messageReference
      }
    }
  }

  async updateMessageReference({
    messageReferenceId,
    modifiedById,
    ...data
  }: UpdateMessageReferenceInput &
    TypeIds<'modifiedById' | 'messageReferenceId'>) {
    const messageReference = await this.findMessageReferenceById(
      messageReferenceId
    )
    assign(messageReference, {
      ...omitBy(cleanObj(data), value => value == undefined),
      modifiedById,
      updatedAt: new Date()
    })
    await messageReference.save()
    return messageReference
  }

  async deleteMessageReference({
    messageReferenceId,
    modifiedById
  }: TypeIds<'modifiedById' | 'messageReferenceId'>) {
    const messageReference = await this.findMessageReferenceById(
      messageReferenceId
    )

    if (messageReference.messageReferenceType == MessageReferenceType.Channel) {
      const team = await this.teamService.findTeamById(
        messageReference.teamId || ''
      )

      const modifyingMember =
        team.members.find(e => e._id == modifiedById).role ==
        TeamMemberRole.Admin

      if (!modifyingMember) {
        throw new UnauthorizedException(
          'You do not have permission to modify this message reference'
        )
      }

      assign(messageReference, {
        isAvailable: false,
        modifiedById,
        updatedAt: new Date()
      })

      await messageReference.save()
      return messageReference
    }

    if (messageReference.messageReferenceType == MessageReferenceType.Group) {
      const modifyingMember =
        messageReference.members.find(e => e._id == modifiedById).role ==
        MessageReferenceMemberRole.Admin

      if (!modifyingMember) {
        throw new UnauthorizedException(
          'You do not have permission to modify this message reference'
        )
      }

      assign(messageReference, {
        isAvailable: false,
        modifiedById,
        updatedAt: new Date()
      })

      await messageReference.save()
      return messageReference
    }

    if (
      messageReference.messageReferenceType == MessageReferenceType.Personal
    ) {
      assign(messageReference, {
        isAvailable: false,
        modifiedById,
        updatedAt: new Date()
      })

      await messageReference.save()
      return messageReference
    }

    throw new NotFoundException('Invalid request')
  }

  async addMessageReferenceMembers({
    modifiedById,
    messageReferenceId,
    members
  }: { members: CreateMessageReferenceMemberInput[] } & TypeIds<
    'modifiedById' | 'messageReferenceId'
  >) {
    const messageReference = await this.findMessageReferenceById(
      messageReferenceId
    )
    messageReference.members.push(...(members as any))
    assign(messageReference, { modifiedById, updatedAt: new Date() })
    await messageReference.save()
    return messageReference
  }

  async updateMessageReferenceMembers({
    modifiedById,
    messageReferenceId,
    members
  }: { members: UpdateMessageReferenceMemberInput[] } & TypeIds<
    'modifiedById' | 'messageReferenceId'
  >) {
    const messageReference = await this.findMessageReferenceById(
      messageReferenceId
    )
    for (const updatedMember of members) {
      const existingMember = messageReference.members.find(
        member => member._id == updatedMember._id
      )
      if (existingMember) {
        assign(
          existingMember,
          omitBy(cleanObj(updatedMember), value => value == undefined)
        )
      }
    }
    assign(messageReference, { modifiedById, updatedAt: new Date() })
    await messageReference.save()
    return messageReference
  }

  async deleteMessageReferenceMembers({
    modifiedById,
    messageReferenceId,
    membersId
  }: { membersId: string[] } & TypeIds<'modifiedById' | 'messageReferenceId'>) {
    const messageReference = await this.findMessageReferenceById(
      messageReferenceId
    )
    messageReference.members = messageReference.members.filter(
      member => !membersId.includes(member._id)
    )
    assign(messageReference, { modifiedById, updatedAt: new Date() })
    await messageReference.save()
    return messageReference
  }

  async pinMessage({
    modifiedById,
    messageId
  }: TypeIds<'modifiedById' | 'messageId'>) {
    const mess = await this.messageService.findById(messageId)

    const messageReference = await this.findMessageReferenceById(
      mess.messageReferenceId
    )

    assign(messageReference, {
      pinId: messageId,
      modifiedById,
      updatedAt: new Date()
    })

    await messageReference.save()
    return messageReference
  }

  async unPinMessage({
    modifiedById,
    messageReferenceId
  }: TypeIds<'modifiedById' | 'messageReferenceId'>) {
    const messageReference = await this.findMessageReferenceById(
      messageReferenceId
    )

    assign(messageReference, {
      pinId: undefined,
      modifiedById,
      updatedAt: new Date()
    })

    await messageReference.save()
    return messageReference
  }
}
