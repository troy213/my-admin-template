import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const SidebarMenu = (props) => {
  const { content } = props

  const { auth } = useAuth()
  const location = useLocation()
  const rootPath = `/${location.pathname.split('/')[1]}`

  return (
    <>
      {content.map((menu, index) => {
        const { icon, link, name, allowedRoles } = menu

        return (
          <React.Fragment key={index}>
            {allowedRoles.includes(auth?.roles) ? (
              <li
                className={`sidebar__item${rootPath === link ? ' active' : ''}`}
              >
                {icon}
                <Link to={link} className='text--3'>
                  {name}
                </Link>
              </li>
            ) : null}
          </React.Fragment>
        )
      })}
    </>
  )
}

export default SidebarMenu
