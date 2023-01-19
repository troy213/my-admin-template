import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Navbar, Sidebar } from '..'

const ProtectedLayout = () => {
  return (
    <div className='protected-layout'>
      <ToastContainer position='top-center' />
      <Navbar />
      <div className='protected-layout__container'>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default ProtectedLayout
