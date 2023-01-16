import SidebarMenu from './SidebarMenu'
import { SIDEBAR_NAVIGATION } from './const'

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      {SIDEBAR_NAVIGATION.map((menu, index) => {
        const { title, content } = menu

        return (
          <section key={index}>
            <p className='sidebar__title text--bold'>{title}</p>
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
