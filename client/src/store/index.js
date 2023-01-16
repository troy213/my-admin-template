import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './login-slice'
import registerSlice from './register-slice'

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    register: registerSlice.reducer,
  },
})

export default store
