import { Navbar, Sidebar } from '..'
import { Outlet } from 'react-router-dom'

const ProtectedLayout = () => {
  return (
    <div className='protected-layout'>
      <Navbar />
      <div className='protected-layout__container'>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default ProtectedLayout
