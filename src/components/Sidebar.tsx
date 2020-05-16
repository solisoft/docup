import { h, FunctionComponent } from 'preact'
import { SidebarMenuItem } from '../markdown'
import { useEffect, useState, useRef } from 'preact/hooks'
import { NavLink } from '../docup'

export const Sidebar: FunctionComponent<{
  menu: SidebarMenuItem[]
  title: string
  showSidebar: boolean
  navLinks: NavLink[]
}> = ({ menu, title, showSidebar, navLinks }) => {
  const [hash, setHash] = useState('')
  const sidebarRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setHash(location.hash)
    const onHashChange = () => {
      setHash(location.hash)
      if (location.hash) {
        const el: HTMLAnchorElement | null = document.querySelector(
          `.sidebar .menu_item[href="${location.hash}"]`
        )
        if (el) {
          if (sidebarRef.current) {
            sidebarRef.current.scrollTop = el.offsetTop - 100
          }
        }
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <div
      ref={sidebarRef}
      class={
        `fixed md:pt-12 sidebar left-0 top-0 bottom-0` +
        (showSidebar ? ' sidebar_show' : '')
      }
    >
      <div class="md:hidden sidebar_navbar pb-3">
        <h1 class="text-2xl px-5 flex h-12 items-center">{title}</h1>
        <div>
          <ul>
            {navLinks.map((link, index) => {
              return (
                <li key={index}>
                  <a class="navlink" href={link.link}>
                    {link.text}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div class="my-5">
        {menu.map((item, index) => {
          return (
            <a
              class={
                `flex px-5 h-8 items-center menu_item` +
                (item.slug === hash.slice(1) ? ' menu_item__active' : '')
              }
              data-slug={item.slug}
              key={index}
              data-depth={item.depth}
              href={`#${item.slug}`}
            >
              {item.text}
            </a>
          )
        })}
      </div>
    </div>
  )
}
