import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'
import { BoardDataBlockUnion } from '../../graphql/gen-types'
import { arrayUtils, cleanObj } from '../../utils'

export type Blocks = { [key: string]: BoardDataBlockUnion }

type Board = {
  blocks: Blocks
  boardId: string
  cardOpenId?: string
  replyCommentId?: string
  loading: boolean
}

const initialState: Board = {
  blocks: {},
  boardId: '',
  loading: true
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    initBoard: (_state, action: PayloadAction<Board>) => {
      return action.payload
    },

    boardUpdated: (_state, action: PayloadAction<BoardDataBlockUnion[]>) => {
      const state = cloneDeep(_state)
      const blocks = action.payload
      blocks.forEach(block => {
        state.blocks[block._id] = {
          ...state.blocks[block._id],
          ...cleanObj(block)
        }
      })

      return state
    },
    resetBoard: () => initialState,

    changeColumnPosition: (
      _state,
      action: PayloadAction<{ columnId: string; toPosition: number }>
    ) => {
      const state = cloneDeep(_state)
      const { columnId, toPosition } = action.payload

      const boardBlock = state.blocks[state.boardId]
      if (boardBlock.__typename === 'Board')
        boardBlock.columnsId = arrayUtils.moveElementToIndex(
          boardBlock.columnsId,
          columnId,
          toPosition
        )

      return state
    },

    changeCardPosition: (
      _state,
      action: PayloadAction<{
        cardId: string
        fromColumnId: string
        toColumnId: string
        toPosition: number
      }>
    ) => {
      const state = cloneDeep(_state)
      const { fromColumnId, toColumnId, toPosition, cardId } = action.payload

      if (fromColumnId === toColumnId) {
        const columnBlock = state.blocks[toColumnId]
        if (columnBlock.__typename === 'Column') {
          columnBlock.cardsId = arrayUtils.moveElementToIndex(
            columnBlock.cardsId,
            toColumnId,
            toPosition
          )
        }
      } else {
        const fromColumnBlock = state.blocks[fromColumnId]
        const toColumnBlock = state.blocks[toColumnId]

        if (
          fromColumnBlock.__typename === 'Column' &&
          toColumnBlock.__typename === 'Column'
        ) {
          fromColumnBlock.cardsId = arrayUtils.removeElement(
            fromColumnBlock.cardsId,
            cardId
          )

          toColumnBlock.cardsId = arrayUtils.insertElementAtIndex(
            toColumnBlock.cardsId,
            cardId,
            toPosition
          )
        }
      }

      return state
    },

    toggleCard: (state, action: PayloadAction<string | undefined>) => {
      state.cardOpenId = action.payload
    },

    toggleReplyComment: (state, action: PayloadAction<string | undefined>) => {
      state.replyCommentId = action.payload
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  }
})

export const boardActions = boardSlice.actions
export default boardSlice.reducer
