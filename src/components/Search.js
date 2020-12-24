import { useState, useCallback, useRef, useEffect } from 'react'
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { createPortal } from 'react-dom'

const ACTION_KEY_DEFAULT = ['Ctrl ', 'Control']
const ACTION_KEY_APPLE = ['⌘', 'Command']

function Hit({ hit, children }) {
  return (
    <Link href={hit.url}>
      <a>{children}</a>
    </Link>
  )
}

function Search({setSearchIsOpen}) {
  const router = useRouter()
  const [actionKey, setActionKey] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const searchButtonRef = useRef()
  const [initialQuery, setInitialQuery] = useState(null)
  
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
        setActionKey(ACTION_KEY_APPLE)
      } else {
        setActionKey(ACTION_KEY_DEFAULT)
      }
    }
  }, [])

  useEffect(()=>{
    if(setSearchIsOpen !== undefined)
    {
      setSearchIsOpen(isOpen)
    }
  },[isOpen])

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const onInput = useCallback(
    (e) => {
      setIsOpen(true)
      setInitialQuery(e.key)
    },
    [setIsOpen, setInitialQuery]
  )

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  })
  
  return (
    <>
      <Head>
        <link key="algolia" rel="preconnect" href="https://BH4D9OD16A-dsn.algolia.net" crossOrigin="true" />
      </Head>
      <button 
        type="button"
        ref={searchButtonRef}
        onClick={onOpen}
        className="group form-input border shadow-sm hover:text-gray-600 hover:border-gray-300 transition duration-150 ease-in-out pointer flex items-center bg-gray-50 text-left w-full text-gray-500 rounded-lg text-sm align-middle"
      >
        <svg width="1em" height="1em" className="mr-3 align-middle text-gray-600 flex-shrink-0 group-hover:text-gray-700" style={{marginBottom: 2}} viewBox="0 0 20 20">
          <path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" strokeWidth={2} fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="flex-1">
          Search docs
        </p>

        {actionKey && (
          <span className="hidden sm:block text-gray-400 text-sm leading-5 py-0.5 px-1.5 border border-gray-300 rounded-md">
            <span className="sr-only">Press </span>
            <kbd className="font-sans">
              <abbr title={actionKey[1]} className="no-underline">
                {actionKey[0]}
              </abbr>
            </kbd>
            <span className="sr-only"> and </span>
            <kbd className="font-sans">K</kbd>
            <span className="sr-only"> to search</span>
          </span>
        )}
     </button>
     {isOpen &&
        createPortal(
          <DocSearchModal
            initialQuery={initialQuery}
            renderModal= {true}
            initialScrollY={window.scrollY}
            searchParameters={{
              distinct: 1,
              // hitsPerPage: 5
            }}
            onClose={onClose}
            indexName="wrapt"
            apiKey="6f27d54591339cbb9983fc5344626dff"
            appId="BH4D9OD16A"
            navigator={{
              navigate({ suggestionUrl }) {
                setIsOpen(false)
                router.push(suggestionUrl)
              },
            }}
            hitComponent={Hit}
            transformItems={(items) => {
              return items.map((item) => {
                // We transform the absolute URL into a relative URL to
                // leverage Next's preloading.
                const a = document.createElement('a')
                a.href = item.url

                const hash = a.hash === '#content-wrapper' ? '' : a.hash

                return {
                  ...item,
                  url: `${a.pathname}${hash}`,
                }
              })
            }}
            
            // transformItems={items => {
            //   return items.map(item => {
            //     const url = new URL(item.url)
            //     return {
            //       ...item,
            //       url: item.url
            //         .replace(url.origin, '')
            //         .replace('#__next', '')
            //         .replace('/docs/#', '/docs/overview#'),
            //     }
            //   })
            // }}
          />,
          document.body
        )}
    </>
  )
}

export default Search
