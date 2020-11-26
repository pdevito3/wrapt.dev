import React, { useState } from 'react';
import { Transition } from '@headlessui/react'
import Link from 'next/link'

export default function Sidebar(props) {
  const [open, toggleSidebar] = useState(false)
  const mobileNavButtonSvgClass = "mr-4 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150";
  const webNavButtonSvgClass = "mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150";


  return ( 
    <div className="h-screen flex overflow-hidden bg-white" onKeyDown={(event) => {if(event.key === "Escape") toggleSidebar(false)}} tabIndex="0">
    {/* Off-canvas menu for mobile */}
    <Transition show={open} className={`md:hidden`}>
      <div className="fixed inset-0 flex z-40">       

            <Transition.Child
              enter = "transition-opacity ease-linear duration-300"
              enterFrom = "opacity-0"
              enterTo = "opacity-100"
              leave= "transition-opacity ease-linear duration-300"
              leaveFrom = "opacity-100"
              leaveTo = "opacity-0"
              className="fixed inset-0"
              onClick={() => toggleSidebar(false)}>
              <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
            </Transition.Child>

          
            <Transition.Child
              enter ="transition ease-in-out duration-300 transform"
              enterFrom ="-translate-x-full"
              enterTo ="translate-x-0"
              leave ="transition ease-in-out duration-300 transform"
              leaveFrom ="translate-x-0"
              leaveTo ="-translate-x-full"
              className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-14 p-1">
                <button onClick={() => toggleSidebar(false)} className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600" aria-label="Close sidebar">
                  <svg className="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/v1/workflow-logo-on-white.svg" alt="Workflow" />
                </div>
                <nav className="mt-5 px-2 space-y-1">

                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <a href="/" className="flex-shrink-0 group block focus:outline-none">
                  <div className="flex items-center">
                    <div>
                      <img className="inline-block h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    </div>
                    <div className="ml-3">
                      <p className="text-base leading-6 font-medium text-gray-700 group-hover:text-gray-900">
                        Tom Cook
                      </p>
                      <p className="text-sm leading-5 font-medium text-gray-500 group-hover:text-gray-700 group-focus:underline transition ease-in-out duration-150">
                        View profile
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </Transition.Child>
        <div className="flex-shrink-0 w-14">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </div>
    </Transition>
  
    {/* Static sidebar for desktop */}
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/v1/workflow-logo-on-white.svg" alt="Workflow" />
            </div>
            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">

            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <a href="/" className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <img className="inline-block h-9 w-9 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
                <div className="ml-3">
                  <p className="text-sm leading-5 font-medium text-gray-700 group-hover:text-gray-900">
                    Tom Cook
                  </p>
                  <p className="text-xs leading-4 font-medium text-gray-500 group-hover:text-gray-700 transition ease-in-out duration-150">
                    View profile
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col w-0 flex-1 overflow-hidden">
      <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
        <button onClick={() => toggleSidebar(true)} className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150" aria-label="Open sidebar">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabIndex={0}>
        <div className="pt-2 pb-6 md:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* <Switch>
              {props.routes.map((route, index) => (
                // You can render a <Route> in as many places
                // as you want in your app. It will render along
                // with any other <Route>s that also match the URL.
                // So, a sidebar or breadcrumbs or anything else
                // that requires you to render multiple things
                // in multiple places at the same URL is nothing
                // more than multiple <Route>s.
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.page />}
                />
              ))}
            </Switch> */}
          </div>
        </div>
      </main>
    </div>
  </div>
  );
}
 