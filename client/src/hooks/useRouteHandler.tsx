import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageReferenceType } from '../graphql/gen-types'
import { WorkspaceConfig } from '../redux/slices/workspace.slice'
import { useAppSelector } from '../redux/store'
import { createPath } from '../utils'
import useAppParams from './useBoardParams'

export default function useRouteHandler() {
  const { boardId, channelId, groupId, messageId, teamId } = useAppParams()
  const navigate = useNavigate()

  const newParams = useAppSelector(state => {
    if (state.workspace.loading) return

    const blocks = state.workspace.blocks

    if (!teamId) return { teamId: WorkspaceConfig.personalTeam }

    if (teamId && teamId !== WorkspaceConfig.personalTeam) {
      const team = blocks[teamId]
      if (team && team.__typename === 'Team') {
      } else return { teamId: WorkspaceConfig.personalTeam }
    }

    if (boardId) {
      const board = blocks[boardId]
      if (
        board &&
        board.__typename === 'Board' &&
        (board.teamId === teamId ||
          (teamId === WorkspaceConfig.personalTeam && !board.teamId))
      ) {
      } else return { teamId }
    }

    if (channelId) {
      const channel = blocks[channelId]
      if (
        channel &&
        channel.__typename === 'MessageReference' &&
        channel.teamId === teamId &&
        channel.messageReferenceType === MessageReferenceType.Channel
      ) {
      } else return { teamId }
    }

    if (groupId) {
      const group = blocks[groupId]
      if (
        group &&
        group.__typename === 'MessageReference' &&
        group.messageReferenceType === MessageReferenceType.Group
      ) {
      } else return { teamId }
    }

    if (messageId) {
      const message = blocks[messageId]
      if (
        message &&
        message.__typename === 'MessageReference' &&
        message.messageReferenceType === MessageReferenceType.Personal
      ) {
      } else return { teamId }
    }

    // return { teamId: TeamConfig.personalTeam }
  })

  useEffect(() => {
    if (newParams) navigate(createPath(newParams))
  }, [newParams])

  return newParams === undefined
}
