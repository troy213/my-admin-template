import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const SidebarMenu = (props) => {
  const { content } = props

  const { auth } = useAuth()
  const location = useLocation()

  return (
    <>
      {content.map((menu, index) => {
        const { icon, link, name, allowedRoles } = menu

        return (
          <React.Fragment key={index}>
            {allowedRoles.includes(auth?.roles) ? (
              <li className='sidebar__item'>
                {icon}
                <Link to={link}>{name}</Link>
              </li>
            ) : null}
          </React.Fragment>
        )
      })}
    </>
  )
}

export default SidebarMenu
