import { createContext, useState, forwardRef, useRef } from 'react'
import { Transition } from '@headlessui/react'
import Link from 'next/link'
import Sidebar from 'src/components/Sidebar'

export const SidebarContext = createContext()

export function SidebarLayout({ children, navIsOpen, setNavIsOpen, nav, sidebar, fallbackHref }) {
  return (
    <>
      {/* <Sidebar children={children}/> */}
      <div className="bg-blue-500 px-48">sidebar</div>
      <div className="prose">
        {children}
      </div>
    </>
  )
}



export default SidebarLayout