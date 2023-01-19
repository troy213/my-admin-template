import { createSlice } from '@reduxjs/toolkit'

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState: {
    oldPassword: '',
    newPassword: '',
    rePassword: '',
    error: {
      newPassword: false,
      rePassword: false,
    },
  },
  reducers: {
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

export const changePasswordAction = changePasswordSlice.actions

export default changePasswordSlice
