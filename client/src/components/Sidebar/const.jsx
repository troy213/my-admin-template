import {
  GroupIcon,
  HomeIcon,
  LockIcon,
  ManageAccountsIcon,
  SettingsIcon,
} from '../../assets/icons'

export const SIDEBAR_NAVIGATION = [
  {
    title: 'Dashboard',
    content: [
      {
        icon: <HomeIcon className='sidebar-icon' />,
        link: '/',
        name: 'Home',
        allowedRoles: [1, 2],
      },
      {
        icon: <SettingsIcon className='sidebar-icon' />,
        link: '/config',
        name: 'Config',
        allowedRoles: [1, 2],
      },
    ],
  },
  {
    title: 'Account',
    content: [
      {
        icon: <ManageAccountsIcon className='sidebar-icon' />,
        link: '/staff',
        name: 'Manage',
        allowedRoles: [1],
      },
      {
        icon: <GroupIcon className='sidebar-icon' />,
        link: '/register',
        name: 'Register',
        allowedRoles: [1],
      },
      {
        icon: <LockIcon className='sidebar-icon' />,
        link: '/change-password',
        name: 'Change Password',
        allowedRoles: [1, 2],
      },
    ],
  },
]
