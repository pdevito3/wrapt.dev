import Head from 'next/head'
import NextLink from 'next/link'
import Banner from 'src/components/Banner'
import Search from 'src/components/Search'
import FeatureBlock from 'src/components/FeatureBlock'

export default function Home() {
  return (
    <div >
      <Head>
        <meta
          key="twitter:title"
          name="twitter:title"
          content="Wrapt - Scaffold an entire Web API with a simple yaml file."
        />
        <meta
          key="og:title"
          property="og:title"
          content="Wrapt - Scaffold an entire Web API with a simple yaml file."
        />
        <title>Wrapt - Scaffold an entire Web API with a simple yaml file.</title>
      </Head>

      {/* <Banner /> */}
      <header className="relative z-10 max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto">
        <div className="px-4 sm:px-6 md:px-8 mb-14 sm:mb-20 xl:mb-8">
          <div className="border-b border-gray-200 py-4 flex items-center justify-between mb-16 sm:mb-20 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex flex-1 items-center space-x-5 max-w-lg">
              <p className="text-violet-500 w-1/2">Wrapt SVG</p>
              {/* <Search /> */}
            </div>

            <div className="flex space-x-6 sm:space-x-10">
              <NextLink href="/docs/how-it-works">
                <a className="text-base leading-6 font-medium hover:text-gray-600 transition-colors duration-200">
                  Docs
                </a>
              </NextLink>
              <a
                target="_blank"
                href="https://github.com/pdevito3/craftsman"
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                <span className="sr-only">Tailwind CSS on GitHub</span>
                <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                  />
                </svg>
              </a>
            </div>
          </div>
          {/* <Logo className="w-auto h-7 sm:h-8" /> */}
          <div className="text-center w-full">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 mt-10 mb-8 sm:mt-14 sm:mb-10">
              Skip the boilerplate and
              <span className="text-violet-700 font-semibold whitespace-pre-wrap"> focus on your business logic.</span>
            </h1>
            <div className="w-full flex items-center justify-center">
              <p className="max-w-lg md:max-w-3xl text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11 ">
                Scaffold an entire Web API with a simple yaml or json file so you can focus on the high value features in your web app.
              </p>
            </div>
            <div className="flex items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <NextLink href="/docs/how-it-works">
                <a className="w-full sm:w-auto flex-none bg-violet-700 hover:bg-violet-500 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-violet-700 focus:outline-none transition-colors duration-200">
                  Get Started
                </a>
              </NextLink>
              {/* <NpmInstallButton /> */}
            </div>
          </div>
          </div>
        {/* <Hero /> */}
      </header>
      
      <body>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">No More Boilerplate</h2>
            <p className="mt-4 text-lg text-gray-500">Wrapt Web APIs eliminate the tedium so you can hit the ground running and get your applications deployed quickly.</p>
          </div>
          <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
            <FeatureBlock 
              title={'Automated HTTP Endpoint Generation'} 
              details={'Every entity will have GET, POST, PUT, PATCH, and DELETE endpoints automatically generated for you so you can hit the ground running right away.'} 
            />
            <FeatureBlock 
              title={'Clean Architecture'} 
              details={'No need to learn a custom organizational structure — Wrapt Web APIs follow best in class practices with Clean Architecture to optimize for flexibility and scalability. '} 
            />
            <FeatureBlock 
              title={'Filtering, Sorting, and Pagination'} 
              details={'Not only will pagination metadata be returned will all your GET collection requests, but complex filtering and sorting is baked right into your repositories as well. '} 
            />
            <FeatureBlock 
              title={'Unit and Integration Tests '} 
              details={'Web APIs generated with Wrapt will scaffold out unit and integration tests for you automatically, so you can make updates with confidence.'} 
            />
            <FeatureBlock 
              title={'Quick Add Commands'} 
              details={"Craftsman CLI commands allow you to add new entities, properties, and more to your projects in seconds. No more jumping around to make sure your addition is in all the right spots."} 
            />
            <FeatureBlock 
              title={'Built in Swagger Documentation'} 
              details={'Providing detailed documentation for how your API works is critical. Wrapt Web APIs will set up reliable Swagger documentation so your users and dev team know how your API works'} 
            />
            {/* <FeatureBlock 
              title={'Fluent Validation'} 
              details={'test'}
            />
            <FeatureBlock 
              title={'Serilog'} 
              details={'Magna a vel sagittis aliquam eu amet. Et lorem auctor quam nunc odio. Sed bibendum.'} 
            /> */}
          </dl>
        </div>
      </body>
    </div>
  )
}
