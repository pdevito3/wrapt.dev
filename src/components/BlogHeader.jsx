import React from 'react'
import NextLink from 'next/link'
import LogoNoText from '../components/Logo/LogoNoText';
import LogoWithText from '../components/Logo/LogoWithText';
import { RssIcon } from '@heroicons/react/outline'

function BlogHeader() {
  return (
    <div className="">
      <div className="flex items-center justify-between px-4 py-3 mb-4 border-b border-gray-200 sm:mb-8">
        <NextLink href="/">
          <a
            className="overflow-hidden md:w-auto"
            // onContextMenu={(e) => {
            //   e.preventDefault()
            //   Router.push('/brand')
            // }}
          >
            <span className="sr-only">Wrapt home page</span>
            <LogoNoText className={"h-10 w-auto sm:hidden"}  />
            <LogoWithText className={"h-8 w-auto hidden sm:block"}  />
          </a>
        </NextLink>

        <div className="flex items-center justify-center space-x-5 sm:space-x-8">
          <NextLink href="/blog">
            <a className="text-base font-medium leading-6 transition-colors duration-200 hover:text-gray-600">
              Blog
            </a>
          </NextLink>
          <NextLink href="/docs/how-it-works">
            <a className="hidden text-base font-medium leading-6 transition-colors duration-200 md:block hover:text-gray-600">
              Wrapt Docs
            </a>
          </NextLink>
          <a
            target="_blank"
            rel="noopener"
            href="https://wrapt.dev/feed.xml"
            className="hidden text-gray-400 transition-colors duration-200 md:block hover:text-gray-500"
          >
            <span className="sr-only">RSS Feed</span>
            <RssIcon className="w-6"/>
          </a>
          <a
            target="_blank"
            rel="noopener"
            href="https://twitter.com/pdevito3"
            className="hidden text-gray-400 transition-colors duration-200 md:block hover:text-gray-500"
          >
            <span className="sr-only">Craftsman Creator on Twitter</span>
            <svg className="w-6" aria-hidden="true" data-prefix="fab" data-icon="twitter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
            </svg>
          </a>
          <a
            target="_blank"
            rel="noopener"
            href="https://github.com/pdevito3/craftsman"
            className="hidden text-gray-400 transition-colors duration-200 md:block hover:text-gray-500"
          >
            <span className="sr-only">Craftsman on GitHub</span>
            <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
          </a>
          <a
            target="_blank"
            href="https://discord.gg/TBq2rVkSEj"
            className="hidden text-gray-400 transition-colors duration-200 md:block hover:text-gray-500"
          >
            <span className="sr-only">Wrapt Discord Community</span>
            <svg width="24" height="24" aria-hidden="true" fill="currentColor" focusable="false" data-prefix="fab" data-icon="discord" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path fill="currentColor" d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default BlogHeader
