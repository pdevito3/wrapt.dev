import { Dialog, Transition } from '@headlessui/react'
import { MenuAlt2Icon, XIcon } from '@heroicons/react/outline'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, useRef, useState } from "react"
import ReactPlayer from 'react-player/lazy'
import { useRanger } from "react-ranger"
import { animated, useTransition } from "react-spring"
import Banner from 'src/components/Banner'
import FeatureBlock from 'src/components/FeatureBlock'
import Search from 'src/components/Search'
import { VideoSegmentControls } from 'src/components/VideoComponents'
import VideoSlider from "src/components/VideoSlider"
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import LogoNoText from '../components/Logo/LogoNoText'
import LogoWithText from '../components/Logo/LogoWithText'

export default function Home() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false)
  let [searchIsOpen, setSearchIsOpen] = useState()
  let isMounted = useIsMountedRef();

  let segments = {
    apiDescription: { start: 0, end: 35.12 },
    apiBuild: { start: 35.12, end: 67.03 },
    apiRun: { start: 67.03, end: 113.00 },
    apiGrow: { start: 113.00, end: 149.18 },
  }
  let videoPlayer = useRef()
  let [currentTime, setCurrentTime] = useState(0)
  let [playerState, setPlayerState] = useState("loading")
  let [isPlaying, setIsPlaying] = useState(true)

  let currentSegment =
    Object.keys(segments).find((name) => {
      let segment = segments[name]
      return segment.start <= currentTime && segment.end > currentTime
    }) || Object.keys(segments)[0]

  async function handleTimeUpdate(event) {
    if(!searchIsOpen)
      setCurrentTime(event.playedSeconds)
  }

  async function seekVideo(time) {
    await videoPlayer.current.seekTo(time,'seconds')
    setPlayerState("playing")
    setIsPlaying(true)
    setCurrentTime(time)
  }

  async function pauseVideo() {
      setPlayerState("paused")
      setIsPlaying(false)
    // if (isMounted.current) {
    //   setPlayerState("paused")
    //   setIsPlaying(false)
    // }
  }

  async function playVideo() {
    setPlayerState("playing")
    setIsPlaying(true)
    // if (isMounted.current) {
    //   setPlayerState("playing")
    //   setIsPlaying(true)
    // }
  }

  React.useEffect(()=>{
    if(searchIsOpen)
      pauseVideo()
    else
      playVideo()
  },[searchIsOpen])

  const { getTrackProps: trackPropsApiDescription, handles: handlesApiDescription } = useRanger({
    values: [currentTime],
    onChange: seekVideo,
    onDrag: seekVideo,
    min: segments.apiDescription.start,
    max: segments.apiDescription.end,
    stepSize: 1,
  });

  const { getTrackProps: trackPropsApiBuild, handles: handlesApiBuild } = useRanger({
    values: [currentTime],
    onChange: seekVideo,
    onDrag: seekVideo,
    min: segments.apiBuild.start,
    max: segments.apiBuild.end,
    stepSize: 1,
  });

  const { getTrackProps: trackPropsApiRun, handles: handlesApiRun } = useRanger({
    values: [currentTime],
    onChange: seekVideo,
    onDrag: seekVideo,
    min: segments.apiRun.start,
    max: segments.apiRun.end,
    stepSize: 1,
  });

  const { getTrackProps: trackPropsApiGrow, handles: handlesApiGrow } = useRanger({
    values: [currentTime],
    onChange: seekVideo,
    onDrag: seekVideo,
    min: segments.apiGrow.start,
    max: segments.apiGrow.end,
    stepSize: 1,
  });

  return (
    <div >
      <Head>
        {
          !router.pathname.startsWith('/blog') &&
          <>
            <meta
              key="twitter:title"
              name="twitter:title"
              content="Wrapt - Scaffold an entire .NET 5 Web API with a simple yaml or json file."
            />
            <meta
              key="og:title"
              property="og:title"
              content="Wrapt - Scaffold an entire .NET 5 Web API with a simple yaml or json file."
            />
            <meta
              name="description"
              content="Scaffold an entire .NET 5 Web API with a simple yaml or json file."
            />
            <title>Wrapt - Scaffold an entire .NET 5 Web API with a simple yaml or json file.</title>
          </>
        }
      </Head>

      <Banner />
      <header className="relative z-10 max-w-screen-lg mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        <div className="px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between px-4 py-1 mb-16 -mx-4 border-b border-gray-200 sm:mb-20 sm:mx-0 sm:px-0">
            <div className="flex items-center flex-1 max-w-2xl py-2 pr-2 space-x-10 md:space-x-15 sm:py-0">
              <LogoNoText className={"h-12 w-auto lg:hidden"}  />
              <LogoWithText className={"h-16 w-auto hidden lg:block"}  />
              <Search setSearchIsOpen={setSearchIsOpen} />
            </div>

            <div className="flex items-center justify-center space-x-5 sm:space-x-8">
              <NextLink href="/blog">
                <a className="hidden text-base font-medium leading-6 transition-colors duration-200 md:block hover:text-gray-600">
                  Blog
                </a>
              </NextLink>
              <NextLink href="/docs/how-it-works">
                <a className="hidden text-base font-medium leading-6 transition-colors duration-200 md:block hover:text-gray-600">
                  Docs
                </a>
              </NextLink>
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
                href="https://discord.gg/TBq2rVkSEj"
                className="hidden text-gray-400 transition-colors duration-200 md:block hover:text-gray-500"
              >
                <span className="sr-only">Wrapt Discord Community</span>
                <svg width="20" height="20" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="discord" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path fill="currentColor" d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" className />
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

              <button
                type="button"
                className="px-4 text-gray-500 border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt2Icon className="w-6 h-6" aria-hidden="true" />
              </button>
              <MainMobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
            </div>
          </div>
          {/* <Logo className="w-auto h-7 sm:h-8" /> */}
          <div className="w-auto text-center md:w-full">
            <h1 className="mt-10 mb-8 text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl sm:mt-14 sm:mb-10">
              Skip the boilerplate and
              <span className="font-semibold whitespace-pre-wrap text-violet-700"> focus on your business logic.</span>
            </h1>
            <div className="flex items-center justify-center w-full">
              <p className="max-w-lg mb-10 text-lg font-medium md:max-w-3xl sm:text-2xl sm:leading-10 sm:mb-11 ">
                Scaffold an entire .NET 5 Web API with a simple yaml or json file so you can focus on the high value features in your web app.
              </p>
            </div>
          <div className="flex flex-wrap justify-center space-y-4 text-center sm:space-y-0 sm:space-x-4">
              <NextLink href="/docs/how-it-works">
                <a className="flex-none w-full px-6 py-3 text-lg font-semibold leading-6 text-white transition-colors duration-200 border border-transparent sm:w-auto bg-violet-700 hover:bg-violet-500 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-violet-700 focus:outline-none">
                  Get Started
                </a>
              </NextLink>
              <NextLink href="/docs/tutorial">
                <a className="flex items-center justify-center flex-none w-full px-6 py-3 text-lg font-semibold leading-6 transition-colors duration-200 border border-transparent group sm:w-auto text-violet-700 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-violet-700 focus:outline-none">
                  <span className="group-hover:text-violet-500">
                    Start the Tutorial
                  </span>
                  <span>
                    <svg className="w-5 ml-2 h5 group-hover:text-violet-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>
              </NextLink>
              {/* <NpmInstallButton /> */}
            </div>
          </div>
          </div>
        {/* <Hero /> */}
      </header>

    <div className="block">
      <div className="px-1 mt-16 md:px-8 md:mt-20 2xl:mt-24">
        <div className="max-w-lg mx-auto md:max-w-4xl 2xl:max-w-5xl">
          <AspectRatio ratio={16 / 9}>
            <button
              aria-label="main video action"
              className="absolute inset-0 z-10 w-full focus:outline-none"
              onClick={() =>
                playerState === "paused" ? playVideo() : pauseVideo()
              }
            />
            <ReactPlayer
              ref={videoPlayer}
              className='react-player'
              url='https://vimeo.com/535347492'
              playing={isPlaying}
              width='100%'
              height='100%'
              volume={0}
              muted={false}
              loop={true}
              onProgress={handleTimeUpdate}
              config={{
                vimeo: {
                  autoplay: true,
                  muted: true,
                  loop: true,
                  controls: false
                }
              }}
            />
          </AspectRatio>
        </div>
      </div>

      <Gutters>
        <div className="max-w-lg mx-auto md:max-w-4xl 2xl:max-w-5xl">
          <div className="hidden -mx-4 md:flex">
            <div className="w-1/4 px-4">              
              <VideoSlider trackProps={trackPropsApiDescription} handles={handlesApiDescription} isActive={currentSegment==="apiDescription"}/>
            </div>
            <div className="w-1/4 px-4">
              <VideoSlider trackProps={trackPropsApiBuild} handles={handlesApiBuild} isActive={currentSegment==="apiBuild"}/>
            </div>
            <div className="w-1/4 px-4">              
              <VideoSlider trackProps={trackPropsApiRun} handles={handlesApiRun} isActive={currentSegment==="apiRun"}/>
            </div>
            <div className="w-1/4 px-4">
              <VideoSlider trackProps={trackPropsApiGrow} handles={handlesApiGrow} isActive={currentSegment==="apiGrow"}/>
            </div>
          </div>

          <div className="mt-2 md:mt-8 md:hidden">
            <p className="font-medium text-gray-400">
              {currentSegment === "apiDescription"
                ? "Describe your API"
                : currentSegment === "apiBuild"
                ? "Build your API"
                : currentSegment === "apiRun"
                ? "Run your API"
                : "Grow your API"}
            </p>
          </div>

          <div className="hidden mt-3 md:block">
            <div className="flex -mx-4">
              <div className="w-1/4 px-4">
                <button
                  aria-label="play api description video"
                  onClick={async (e) => {
                    await seekVideo(segments.apiDescription.start)
                    await playVideo()
                  }}
                  className={`text-center hover:text-violet-500 block w-full focus:outline-none ${
                    currentSegment === "apiDescription"
                      ? "text-violet-500"
                      : "text-gray-700"
                  }`}
                >
                  Describe your API
                </button>

                {currentSegment === "apiDescription" && (
                  <VideoSegmentControls
                    state={playerState}
                    play={playVideo}
                    pause={pauseVideo}
                    reset={(e) => seekVideo(segments.apiDescription.start)}
                  />
                )}
              </div>

              <div className="w-1/4 px-4">
                <button
                  aria-label="play api build video"
                  onClick={async (e) => {
                    await seekVideo(segments.apiBuild.start)
                    await playVideo()
                  }}
                  className={`text-center hover:text-violet-500 block w-full focus:outline-none ${
                    currentSegment === "apiBuild"
                      ? "text-violet-500"
                      : "text-gray-700"
                  }`}
                >
                  Build your API
                </button>
                {currentSegment === "apiBuild" && (
                  <VideoSegmentControls
                    state={playerState}
                    play={playVideo}
                    pause={pauseVideo}
                    reset={(e) => seekVideo(segments.apiBuild.start)}
                  />
                )}
              </div>

              <div className="w-1/4 px-4">
                <button
                  aria-label="play api run video"
                  onClick={async (e) => {
                    await seekVideo(segments.apiRun.start)
                    await playVideo()
                  }}
                  className={`block text-center hover:text-violet-500 w-full focus:outline-none ${
                    currentSegment === "apiRun"
                      ? "text-violet-500"
                      : "text-gray-700"
                  }`}
                >
                  Run your API
                </button>
                { currentSegment === "apiRun" && (
                  <VideoSegmentControls
                    state={playerState}
                    play={playVideo}
                    pause={pauseVideo}
                    reset={(e) => seekVideo(segments.apiRun.start)}
                  />
                )}
              </div>
              <div className="w-1/4 px-4">
                <button
                  aria-label="play api grow video"
                  onClick={async (e) => {
                    await seekVideo(segments.apiGrow.start)
                    await playVideo()
                  }}
                  className={`text-center hover:text-violet-500 block w-full focus:outline-none ${
                    currentSegment === "apiGrow"
                      ? "text-violet-500"
                      : "text-gray-700"
                  }`}
                >
                  Grow your API
                </button>
                {currentSegment === "apiGrow" && (
                  <VideoSegmentControls
                    state={playerState}
                    play={playVideo}
                    pause={pauseVideo}
                    reset={(e) => seekVideo(segments.apiGrow.start)}
                  />
                )}
              </div>
            </div>
          </div>
              
          <div className="mt-3 overflow-hidden h-52 sm:h-40 md:h-36 md:mt-10 md:text-center md:flex md:justify-center lg:h-32">
            <FadeBetween currentSegment={currentSegment}>
              <State for="apiDescription">
                <Text color="light-gray">
                  In order to scaffold out a new API, we need to build a simple 
                  yaml or json file to describe what we want our API to 
                  look like. This files is just some basic project info
                  (project name, database info), and a description of your entities.
                  We can also provide optional info like environment information 
                  or a swagger layout.
                </Text>
              </State>
              <State for="apiBuild">
                <Text color="light-gray">
                  Next, we can write single Craftsman CLI command (the 
                  workhorse behind the  Wrapt framework) to build our 
                  API for us. The only information this command needs 
                  is the file path for our API description.
                </Text>
              </State>
              <State for="apiRun">
                <Text color="light-gray">
                  Once we've built our project, it's ready for use. 
                  We now have a well organized project that 
                  has a full complement of robust HTTP endpoints and 
                  all of the boilerplate eliminated for us.
                </Text>
              </State>
              <State for="apiGrow">
                <Text color="light-gray">
                  What we've built so far is a great starting point, 
                  but we still have some work to do to grow our API 
                  to meet our exact business needs. We can now go 
                  into our project and modify it however we normally 
                  would by hand and, if we have another requirement 
                  come up with lots of boilerplate (i.e. adding a new 
                  entity or property), we can use the Craftsman CLI 
                  to speed our work along!
                </Text>
              </State>
            </FadeBetween>
          </div>
        </div>
      </Gutters>
    </div>

    <div className="relative py-8 overflow-hidden bg-white">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
          <div className="relative h-full mx-auto text-lg max-w-prose" aria-hidden="true">
            <svg className="absolute transform top-12 left-full translate-x-72" width="404" height="384" fill="none" viewBox="0 0 404 384">
              <defs>
                <pattern id="74b3fd99-0a6f-4271-bef2-e80eeafdf357" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
            </svg>
            <svg className="absolute transform bottom-12 right-full -translate-x-72" width="404" height="384" fill="none" viewBox="0 0 404 384">
              <defs>
                <pattern id="d3eb07ae-5182-43e6-857d-35c643af9034" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
            </svg>
          </div>
        </div>

        <div className="z-50 px-4 py-8 mx-auto bg-white max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">No More Boilerplate</h2>
            <p className="mt-4 text-lg text-gray-500">Wrapt Web APIs eliminate the tedium so you can hit the ground running and get your applications deployed quickly.</p>
          </div>
          <div className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6 lg:grid-cols-3 lg:gap-x-8">
            <FeatureBlock 
              title={'Automated HTTP Endpoint Generation'} 
              // details={'Every entity will have GET, POST, PUT, PATCH, and DELETE endpoints automatically generated for you so you can hit the ground running right away.'} 
            />
            <FeatureBlock 
              title={'Vertical Slice Architecture'} 
              // details={'No need to learn a custom organizational structure — Wrapt Web APIs follow best in class practices with Clean Architecture to optimize for flexibility and scalability.'} 
            />
            <FeatureBlock 
              title={'Filtering, Sorting, and Pagination'} 
              // details={'Not only will pagination metadata be returned with all your GET collection requests, but complex filtering and sorting is baked right into your repositories as well.'} 
            />
            <FeatureBlock 
              title={'Unit, Integration, & Functional Tests'} 
              // details={'Web APIs generated with Wrapt will scaffold out unit and integration tests for you automatically, so you can make updates with confidence.'} 
            />
            <FeatureBlock 
              title={'Docker Database Tests'} 
              // details={'Web APIs generated with Wrapt will scaffold out unit and integration tests for you automatically, so you can make updates with confidence.'} 
            />
            <FeatureBlock 
              title={'Quick Add Commands'} 
              // details={"Craftsman CLI commands allow you to add new entities, properties, and more to your projects in seconds. No more jumping around to make sure your addition is in all the right spots."} 
            />
            <FeatureBlock 
              title={'Enhanced Swagger Documentation'} 
              // details={"Wrapt Web APIs will not only set up the basic Swagger scaffolding that comes with .NET 5, but can also provide detailed documentation for your endpoint's operations.""} 
            />
            <FeatureBlock 
              title={'Multi-Environment Support'} 
              // details={"Built in support to scaffold out as many environments as you'd like."} 
            />
            <FeatureBlock 
              title={'Flexible Validation'} 
              // details={'Easily validate your HTTP endpoints using the powerful Fluent Validation library.'}
            />
            <FeatureBlock 
              title={'API Versioning'} 
              // details={'Built in API versioning, so your API can grow with your changing needs.'}
            />
            <FeatureBlock 
              title={'Flexible Database Options'} 
              // details={"Easily add a database context for SqlServer or Postgres without any manual setup. The MySql library is currently in pre-release, but will be added with 1st party Wrapt support as soon as it is ready for .NET 5."} 
            />
            <FeatureBlock 
              title={'Serilog Logging'} 
              // details={'Serilog is built into all Wrapt APIs for built in '} 
            />  
            <FeatureBlock 
              title={'Customizable Response Wrapper'} 
            />   
            <FeatureBlock 
              title={'Authorization and Scope Protection'} 
            />  
            <FeatureBlock 
              title={'Pub/Sub Scaffolding with MassTransit'} 
            />  
          </div>
        </div>
      </div>
    </div>
  )
}

function Gutters({ children }) {
  return <div className="px-5 mt-12 md:px-8">{children}</div>
}


function FadeBetween({ children, currentSegment }) {
  let segments = React.Children.toArray(children).reduce((memo, child) => {
    memo[child.props.for] = child.props.children

    return memo
  }, {})

  const transitions = useTransition(currentSegment, (i) => i, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <div className="relative w-full">
      {transitions.map(({ item, props, key }) => {
        return (
          <animated.div className="absolute w-full" style={props} key={key}>
            <div className="flex justify-center">{segments[item]}</div>
          </animated.div>
        )
      })}
    </div>
  )
}

function Text({ children, color }) {
  let styles = {
    "light-gray": "text-gray-500",
    "dark-gray": "text-gray-700",
  }

  if (styles[color] === undefined) {
    throw new Error("<Text> requires a color.")
  }

  return (
    <p className={`${styles[color]} md:text-lg max-w-measure`}>{children}</p>
  )
}

function State() {}

function AspectRatio({ ratio, children }) {
  return (
    <div
      className="relative"
      style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
    >
      <div className="absolute inset-0 w-full h-full">{children}</div>
    </div>
  )
}


function MainMobileSidebar({sidebarOpen, setSidebarOpen}) {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 z-40 flex md:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gray-100">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 pt-2 -mr-12">
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex items-center flex-shrink-0 px-4">
                <LogoWithText className={"h-8 w-auto"} alt="Wrapt" />
              </div>
              <div className="flex-1 h-0 mt-5 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  <MobileNavItem text={"Docs"} isWrapt={true} href={"/docs"}>
                    <svg className="flex-shrink-0 w-6 h-6 mr-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </MobileNavItem>

                  <MobileNavItem text={"Blog"} isWrapt={true} href={"/blog"}>
                    <svg className="flex-shrink-0 w-6 h-6 mr-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
                  </MobileNavItem>

                  <MobileNavItem text={"Github"} href={"https://github.com/pdevito3/craftsman"} newTab={true}>
                    <svg className="flex-shrink-0 w-6 h-6 mr-4 text-violet-400" viewBox="0 0 16 16" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                      />
                    </svg>
                  </MobileNavItem>

                  <MobileNavItem text={"Twitter"} href={"https://twitter.com/pdevito3"} newTab={true}>
                    <svg className="flex-shrink-0 w-6 h-6 mr-4 text-violet-400" aria-hidden="true" data-prefix="fab" data-icon="twitter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                    </svg>
                  </MobileNavItem>
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
  )
}

function MobileNavItem({children, text, href, isWrapt, newTab}){

  var target = newTab ? `_blank` : null;

  if(isWrapt){
    return(
      <NextLink href={href}>
        <a
          key={text}
          target={{target}}
          className={'text-violet-600 hover:bg-violet-100 group flex items-center px-2 py-2 text-base font-medium rounded-md cursor-pointer'}
        >
          {children}
          {text}
        </a>
      </NextLink>
    )
  }

  return (
    <a
      key={text}
      target={{target}}
      href={href}
      className={'text-violet-600 hover:bg-violet-100 group flex items-center px-2 py-2 text-base font-medium rounded-md cursor-pointer'}
    >
      {children}
      {text}
    </a>
  )
}
