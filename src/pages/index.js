import React, { useState, useRef } from "react"
import Vimeo from "@u-wave/react-vimeo"
import Head from 'next/head'
import NextLink from 'next/link'
import Banner from 'src/components/Banner'
import Search from 'src/components/Search'
import FeatureBlock from 'src/components/FeatureBlock'
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import dynamic from 'next/dynamic'
import { VideoSegmentControls, VideoSegmentProgress } from 'src/components/VideoComponents'
import { useSpring, animated, useTransition } from "react-spring"
import ReactPlayer from 'react-player/lazy'
import { useRanger } from "react-ranger";
import VideoSlider from "src/components/VideoSlider"
import LogoNoText from '../components/Logo/LogoNoText';
import LogoWithText from '../components/Logo/LogoWithText';

export default function Home() {
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
      </Head>

      <Banner />
      <header className="relative z-10 max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto">
        <div className="px-4 sm:px-6 md:px-8">
          <div className="border-b border-gray-200 py-1 flex items-center justify-between mb-16 sm:mb-20 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex flex-1 items-center space-x-10 sm:space-x-15 max-w-2xl pr-2 py-2 sm:py-0">
              <LogoNoText className={"h-12 w-auto sm:hidden"}  />
              <LogoWithText className={"h-16 w-auto hidden sm:block"}  />
              <Search setSearchIsOpen={setSearchIsOpen} />
            </div>

            <div className="flex items-center justify-center space-x-5 sm:space-x-8">
              <NextLink href="/docs/how-it-works">
                <a className="hidden md:block text-base leading-6 font-medium hover:text-gray-600 transition-colors duration-200">
                  Docs
                </a>
              </NextLink>
              <a
                target="_blank"
                rel="noopener"
                href="https://twitter.com/pdevito3"
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
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
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                <span className="sr-only">Craftsman on GitHub</span>
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
          <div className="text-center w-auto md:w-full">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 mt-10 mb-8 sm:mt-14 sm:mb-10">
              Skip the boilerplate and
              <span className="text-violet-700 font-semibold whitespace-pre-wrap"> focus on your business logic.</span>
            </h1>
            <div className="w-full flex items-center justify-center">
              <p className="max-w-lg md:max-w-3xl text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11 ">
                Scaffold an entire .NET 5 Web API with a simple yaml or json file so you can focus on the high value features in your web app.
              </p>
            </div>
          <div className="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 text-center justify-center">
              <NextLink href="/docs/how-it-works">
                <a className="w-full sm:w-auto flex-none bg-violet-700 hover:bg-violet-500 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-violet-700 focus:outline-none transition-colors duration-200">
                  Get Started
                </a>
              </NextLink>
              <NextLink href="/docs/tutorial">
                <a className="group w-full sm:w-auto flex-none text-violet-700 text-lg leading-6 font-semibold flex items-center justify-center py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-violet-700 focus:outline-none transition-colors duration-200">
                  <span className="group-hover:text-violet-500">
                    Start the Tutorial
                  </span>
                  <span>
                    <svg className="h5 w-5 ml-2 group-hover:text-violet-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <div className="px-1 md:px-8 mt-16 md:mt-20 2xl:mt-24">
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
          <div className="hidden md:flex -mx-4">
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
              
          <div className="h-52 sm:h-40 mt-3 overflow-hidden md:h-36 md:mt-10 md:text-center md:flex md:justify-center lg:h-32">
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

    <div className="relative py-8 bg-white overflow-hidden">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
          <div className="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
            <svg className="absolute top-12 left-full transform translate-x-72" width="404" height="384" fill="none" viewBox="0 0 404 384">
              <defs>
                <pattern id="74b3fd99-0a6f-4271-bef2-e80eeafdf357" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
            </svg>
            <svg className="absolute bottom-12 right-full transform -translate-x-72" width="404" height="384" fill="none" viewBox="0 0 404 384">
              <defs>
                <pattern id="d3eb07ae-5182-43e6-857d-35c643af9034" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white z-50">
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
