import SidebarMenu from './SidebarMenu'
import { SIDEBAR_NAVIGATION } from './const'

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      {SIDEBAR_NAVIGATION.map((menu, index) => {
        const { title, content } = menu

        return (
          <section key={index}>
            <h3 className='sidebar__title'>{title}</h3>
            <ul className='sidebar__list mt-4'>
              <SidebarMenu content={content} />
            </ul>
          </section>
        )
      })}
    </aside>
  )
}

export default Sidebar
