import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PersonIcon } from '../../assets/icons'
import useLogout from '../../hooks/useLogout'
import useAuth from '../../hooks/useAuth'
import './index.scss'

const Navbar = () => {
  const navigate = useNavigate()
  const logout = useLogout()
  const { auth } = useAuth()

  const signOut = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className='navbar'>
      <div className='navbar__wrapper'>
        <div className='navbar__left'>
          <a href='/'>
            <span className='navbar__title text--6 text--bold'>Admin</span>
          </a>
        </div>
        <div className='navbar__right'>
          <span className='navbar__user'>
            <PersonIcon />
            {auth?.username}
          </span>
          <button className='btn btn-outline-light' onClick={signOut}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
