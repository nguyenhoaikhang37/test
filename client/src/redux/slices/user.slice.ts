import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'
import { User } from '../../graphql/gen-types'
import { cleanObj } from '../../utils'
import { lsActions } from '../../utils/auth'

interface UserState {
  userInfo: User | null
  isAuthenticated: boolean | null
  token: string | null

  users: {
    [key: string]: User
  }
}

const initialState: UserState = {
  userInfo: lsActions.getUser(),
  users: {},
  isAuthenticated: !!lsActions.getToken(),
  token: lsActions.getToken()
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.isAuthenticated = true
      state.userInfo = action.payload.user
      state.token = action.payload.token

      lsActions.setToken(action.payload.token)
      lsActions.setUser(action.payload.user)
    },
    loginFailure: state => {
      state.isAuthenticated = false
      lsActions.clearLS()
    },
    loadSuccess: (state, action: PayloadAction<{ user: User }>) => {
      state.isAuthenticated = true
      state.userInfo = action.payload.user
      state.token = lsActions.getToken()
    },
    logout: state => {
      state.isAuthenticated = false
      state.userInfo = null
      state.token = null
      lsActions.clearLS()
    },

    usersUpdated: (_state, action: PayloadAction<User[]>) => {
      const state = cloneDeep(_state)
      const users = action.payload
      users.forEach(user => {
        state.users[user._id] = {
          ...state.users[user._id],
          ...cleanObj(user)
        }
      })

      return state
    }
  }
})

export const userAction = userSlice.actions

export default userSlice.reducer
