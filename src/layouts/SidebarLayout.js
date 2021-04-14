import { createContext, useState, forwardRef, useRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { useIsomorphicLayoutEffect } from 'src/hooks/useIsomorphicLayoutEffect'
import { useRouter } from 'next/router'

export const SidebarContext = createContext()

export function SidebarLayout({ children, navIsOpen, setNavIsOpen, nav, sidebar, fallbackHref }) {
  return (
    <SidebarContext.Provider value={{ nav, navIsOpen, setNavIsOpen }}>
      <div className="w-full max-w-8xl mx-auto">
        <div className="lg:flex">
          <div
            id="sidebar"
            onClick={() => setNavIsOpen(false)}
            className={clsx(
              'fixed z-40 inset-0 flex-none h-full bg-black bg-opacity-25 w-full lg:bg-white lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block',
              {
                hidden: !navIsOpen,
              }
            )}
          >
            <div
              id="navWrapper"
              onClick={(e) => e.stopPropagation()}
              className="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:sticky lg:bg-transparent overflow-hidden lg:top-18 bg-white mr-24 lg:mr-0"
            >
              <div className="hidden lg:block h-12 pointer-events-none absolute inset-x-0 z-10 bg-gradient-to-b from-white" />
              <Nav nav={nav} fallbackHref={fallbackHref}>
                {sidebar}
              </Nav>
            </div>
          </div>
          <div
            id="content-wrapper"
            className={clsx(
              'min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible',
              {
                'overflow-hidden max-h-screen fixed': navIsOpen,
              }
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  )
}


const NavItem = forwardRef(({ href, children, isActive, isPublished, fallbackHref }, ref) => {
  return (
    <li ref={ref}>
      <Link href={isPublished ? href : fallbackHref}>
        <a
          className={clsx('px-3 py-2 transition-colors duration-200 relative block', {
            'text-violet-700': isActive,
            'hover:text-gray-900 text-gray-500': !isActive && isPublished,
            'text-gray-400': !isActive && !isPublished,
          })}
        >
          <span
            className={clsx('rounded-md absolute inset-0 bg-violet-100', {
              'opacity-50': isActive,
              'opacity-0': !isActive,
            })}
          />
          <span className="relative">{children}</span>
        </a>
      </Link>
    </li>
  )
})

function Nav({ nav, children, fallbackHref }) {
  const router = useRouter()
  const activeItemRef = useRef()
  const scrollRef = useRef()

  useIsomorphicLayoutEffect(() => {
    if (activeItemRef.current) {
      const scrollRect = scrollRef.current.getBoundingClientRect()
      const activeItemRect = activeItemRef.current.getBoundingClientRect()
      scrollRef.current.scrollTop =
        activeItemRect.top - scrollRect.top - scrollRect.height / 2 + activeItemRect.height / 2
    }
  }, [])

  return (
    <nav
      id="nav"
      ref={scrollRef}
      className="px-1 pt-6 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pt-10 lg:pb-16 sticky?lg:h-(screen-18)"
    >
      <ul>
        <div>
          <ul>
            <li>
              <Link href={"/blog"}>
                <a
                  className='flex items-center px-3 hover:text-gray-900 transition-colors duration-200'
                >
                  <div className={`mr-3 rounded-md bg-gradient-to-br from-purple-500 to-indigo-500 p-0.5`}>
                    <svg className="h-6 w-6 text-gray-300 fill-current" viewBox="0 0 24 24">
                      <path className="text-gray-50 fill-current" xmlns="http://www.w3.org/2000/svg"d="M5.04 14.3l-.1-.3H4a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1a1 1 0 0 1 1-1h6.34a3 3 0 0 0 2.12-.88l1.66-1.66A5 5 0 0 1 19.66 3H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-1.34a5 5 0 0 1-3.54-1.46l-1.66-1.66a3 3 0 0 0-2.12-.88H11v5a1 1 0 0 1-1 1H8a1 1 0 0 1-.95-.68l-2-5.98a1 1 0 0 1 0-.05z"/>
                      <rect xmlns="http://www.w3.org/2000/svg" width="8" height="10" x="4" y="6" rx="1"/>
                    </svg>
                  </div>
                  Wrapt Blog
                </a>
              </Link>
            </li>
          </ul> 
        </div>
        {children}
        {nav &&
          Object.keys(nav)
            .map((category) => {
              let publishedItems = nav[category].filter((item) => item.published !== false)
              if (publishedItems.length === 0 && !fallbackHref) return null
              return (
                <li key={category} className="mt-8">
                  <h5
                    className={clsx(
                      'px-3 mb-3 lg:mb-3 uppercase tracking-wide font-semibold text-sm lg:text-xs',
                      {
                        'text-gray-900': publishedItems.length > 0,
                        'text-gray-400': publishedItems.length === 0,
                      }
                    )}
                  >
                    {category}
                  </h5>
                  <ul>
                    {(fallbackHref ? nav[category] : publishedItems).map((item, i) => (
                      <NavItem
                        key={i}
                        href={item.href}
                        isActive={item.href === router.pathname}
                        ref={item.href === router.pathname ? activeItemRef : undefined}
                        isPublished={item.published !== false}
                        fallbackHref={fallbackHref}
                      >
                        {item.shortTitle || item.title}
                      </NavItem>
                    ))}
                  </ul>
                </li>
              )
            })
            .filter(Boolean)}
      </ul>
    </nav>
  )
}

export default SidebarLayout