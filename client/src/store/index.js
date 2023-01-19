import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './users/login-slice'
import registerSlice from './users/register-slice'
import editUserSlice from './users/edit-user-slice'

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    register: registerSlice.reducer,
    editUser: editUserSlice.reducer,
  },
})

export default store
