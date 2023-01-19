import { createSlice } from '@reduxjs/toolkit'

const editUserSlice = createSlice({
  name: 'editUser',
  initialState: {
    id: '',
    username: '',
    roles: '',
    error: {
      username: false,
      roles: false,
    },
  },
  reducers: {
    setData(state, action) {
      state.id = action.payload.id
      state.username = action.payload.username
      state.roles = action.payload.roles
    },
    setInputField(state, action) {
      state[action.payload.field] = action.payload.value
    },
    setError(state, action) {
      state.error[action.payload.field] = action.payload.value
    },
    clearForm(state) {
      for (const stateObj in state) {
        const EXCEPTION = ['error']
        if (EXCEPTION.includes(stateObj)) continue

        state[stateObj] = ''
      }

      for (const stateObj in state.error) {
        state.error[stateObj] = false
      }
    },
  },
})

export const editUserAction = editUserSlice.actions

export default editUserSlice
