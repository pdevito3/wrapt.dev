import React from 'react'

export function SidebarLayout({ children, navIsOpen, setNavIsOpen, nav, sidebar, fallbackHref }) {
  return (
    <>
      <div className="w-56 bg-blue-500 px-5">
        sidebar
      </div>
      {children}
    </>
  )
}

export default SidebarLayout