import React from 'react'

function Banner() {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      {
        isOpen && (
          <div className="bg-violet-500">
            <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between flex-wrap">
                <div className="w-0 flex-1 flex items-center">
                  
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillrule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" cliprule="evenodd" />
                  </svg>
                  <p className="ml-3 font-medium text-white truncate">
                    <span className="md:hidden">
                      Support Wrapt.
                    </span>
                    <span className="hidden md:inline">
                      Support the ongoing development of Wrapt.
                    </span> 
                  </p>
                </div>
                <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                  <a href="#" className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-violet-500 bg-white hover:bg-violet-50">
                    Learn more
                  </a>
                </div>
                <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                  <button onClick={() => setIsOpen(false)} type="button" className="-mr-1 flex p-2 rounded-md hover:bg-violet-300 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
                    <span className="sr-only">Dismiss</span>
                    
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )        
      }
    </>
  )
}

export default Banner
