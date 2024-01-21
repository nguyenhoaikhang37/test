import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { assign, cloneDeep } from 'lodash'
import { WorkspaceInfoBlockUnion } from '../../graphql/gen-types'
import { cleanObj } from '../../utils'

export type WorkspaceInfoBlocks = { [key: string]: WorkspaceInfoBlockUnion }

export const WorkspaceConfig = {
  personalTeam: 'personalTeam'
}

type Workspace = {
  blocks: WorkspaceInfoBlocks
  loading: boolean
}

const initialState: Workspace = {
  blocks: {},
  loading: true
}

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    init: (_state, action: PayloadAction<Workspace>) => {
      return {
        ..._state,
        ...action.payload
      }
    },

    boardDatablocksUpdated: (
      _state,
      action: PayloadAction<WorkspaceInfoBlockUnion[]>
    ) => {
      const state = cloneDeep(_state)
      const teams = action.payload
      teams.forEach(block => {
        state.blocks[block._id] = {
          ...state.blocks[block._id],
          ...cleanObj(block)
        }
      })

      return state
    },

    reset: () => initialState,

    update: (
      _state,
      action: PayloadAction<Partial<Omit<Workspace, 'blocks'>>>
    ) => {
      const newState = cloneDeep(_state)
      assign(newState, action.payload)
      return newState
    }
  }
})

export const workspaceActions = workspaceSlice.actions
export default workspaceSlice.reducer
