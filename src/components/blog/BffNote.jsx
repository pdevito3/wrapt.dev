import React from 'react'
import Link from 'next/link';

export function BffNote() {
  return (
    <>
      {/*
        Make sure you add some bottom padding to pages that include a sticky banner like this to prevent
        your content from being obscured when the user scrolls to the bottom of the page.
      */}
      <div className="fixed inset-x-0 bottom-0 pointer-events-none sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8">
        <div className="pointer-events-auto flex items-center justify-between gap-x-3 bg-gray-900 px-6 py-1 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
          <Link href="/blog/standalone-duende-bff-for-any-spa" >
            <a rel="noopener noreferrer" target="_blank" className="flex items-center justify-between space-x-4">
              <p className="font-semibold leading-6 text-violet-500">Check out a more up to date approach with a standalone BFF</p>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-violet-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}
