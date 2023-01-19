import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout, ProtectedLayout } from './components'
import PersistLogin from './utils/auth/PersistLogin'
import RequireAuth from './utils/auth/RequireAuth'
import {
  ChangePassword,
  Dashboard,
  Login,
  Manage,
  NotFound,
  Register,
  Unauthorized,
  UserDetail,
} from './pages'

const ROLES = {
  admin: 1,
  staff: 2,
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route path='login' element={<Login />} />
        <Route path='unauthorized' element={<Unauthorized />} />

        {/* private routes */}
        <Route element={<PersistLogin />}>
          <Route path='/' element={<ProtectedLayout />}>
            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.admin, ROLES.staff]} />
              }
            >
              <Route path='/' element={<Dashboard />} />
              <Route path='change-password' element={<ChangePassword />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
              <Route path='manage' element={<Manage />} />
              <Route path='manage/:id' element={<UserDetail />} />
              <Route path='register' element={<Register />} />
            </Route>
          </Route>
        </Route>

        {/* 404 not found */}
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
