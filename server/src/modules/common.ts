import { createUnionType } from '@nestjs/graphql'
import { Board } from './board/schemas/board.schema'
import { Card } from './card/card.schema'
import { Checklist } from './checklist/schemas/checklist.schema'
import { Column } from './column/column.schema'
import { Comment } from './comment/comment.schema'
import { MessageReference } from './messageReference/messageReference.schema'
import { Team } from './team/team.schema'

export const BoardDataBlockUnion = createUnionType({
  name: 'BoardDataBlockUnion',
  types: () => [Board, Card, Checklist, Column, Comment] as const,
  resolveType(value: BoardDataBlock) {
    switch (value._blockType) {
      case 'Board':
        return Board
      case 'Card':
        return Card
      case 'Checklist':
        return Checklist
      case 'Column':
        return Column
      case 'Comment':
        return Comment
    }
    return null
  }
})

export type BoardDataBlock = (Board | Card | Checklist | Column | Comment) & {
  _blockType?: 'Board' | 'Column' | 'Card' | 'Checklist' | 'Comment'
}

//Team
export const WorkspaceInfoBlockUnion = createUnionType({
  name: 'WorkspaceInfoBlockUnion',
  types: () => [Board, Team, MessageReference] as const,
  resolveType(value: WorkspaceInfoBlock) {
    switch (value._blockType) {
      case 'Board':
        return Board
      case 'Team':
        return Team
      case 'MessageReference':
        return MessageReference
    }
    return null
  }
})

export type WorkspaceInfoBlock = (Board | Team | MessageReference) & {
  _usersId?: string[]
  _blockType?: 'Board' | 'Team' | 'MessageReference'
}

export type CommontBlock = WorkspaceInfoBlock | BoardDataBlock
