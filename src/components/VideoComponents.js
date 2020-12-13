import React from 'react'
import { usePrevious } from "src/hooks/usePrevious"
import { useSpring, animated, useTransition } from "react-spring"

function VideoSegmentControls({ state, play, pause, reset }) {
  return (
    <div className="flex items-center justify-center mt-2 space-x-4 md:space-x-2">
      <button
        className="text-gray-600 focus:outline-none hover:text-gray-300"
        onClick={reset}
      >
        {/* <ReplayIcon className="w-4 h-4" /> */}
        <svg className="w-5 h-5 md:w-4 md:h-4" viewBox="0 0 20 20">
          <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
            <path fill='currentColor' d="M14.6568542,15.6568542 C13.209139,17.1045695 11.209139,18 9,18 C4.581722,18 1,14.418278 1,10 C1,5.581722 4.581722,2 9,2 C13.418278,2 17,5.581722 17,10 L15,10 C15,6.6862915 12.3137085,4 9,4 C5.6862915,4 3,6.6862915 3,10 C3,13.3137085 5.6862915,16 9,16 C10.6568542,16 12.1568542,15.3284271 13.2426407,14.2426407 L14.6568542,15.6568542 L14.6568542,15.6568542 Z M12,10 L20,10 L16,14 L12,10 L12,10 Z"></path>
          </g>
        </svg>
      </button>
      {state === "paused" ? (
        <button
          className="text-gray-600 focus:outline-none hover:text-gray-300"
          onClick={play}
        >
          {/* <PlayIcon className="w-3 h-3" /> */}
          <svg className="w-5 h-5 md:w-3 md:h-3" width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0L12 6L0 12V0Z" fill="currentColor"/>
          </svg>
        </button>
      ) : (
        <button
          className="text-gray-600 focus:outline-none hover:text-gray-300"
          onClick={pause}
        >
          {/* <PauseIcon className="w-3 h-3" /> */}
          <svg className="w-5 h-5 md:w-3 md:h-3" width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0H2.1V8.4H0V0ZM4.9 0H7V8.4H4.9V0Z" fill="currentColor"/>
          </svg>
        </button>
      )}
    </div>
  )
}

function VideoSegmentProgress({ start, end, current, paused }) {
  let duration = end - start
  let segmentCompletedTime = current - start
  let segmentRemaining = duration - segmentCompletedTime

  let progress =
    current <= start
      ? 0
      : current > end
      ? 100
      : (segmentCompletedTime / duration) * 100

  let previousProgress = usePrevious(progress)
  let changeInProgress = progress - previousProgress
  let didJump = changeInProgress < 0 || changeInProgress > 10

  const props = useSpring({
    to: {
      width: paused ? `${progress}%` : progress > 0 ? "100%" : "0%",
      backgroundColor: progress === 100 ? "#2B2F31" : "#7C3AED",
    },
    immediate: didJump,
    config(key) {
      let map = {
        width: {
          duration: segmentRemaining * 1000,
          easing: (t) => t,
        },
        backgroundColor: {
          duration: 250,
        },
      }

      return map[key]
    },
  })

  return (
    <div className="relative w-full h-1 overflow-hidden transition bg-gray-900 rounded">
      <animated.div
        className="absolute top-0 bottom-0 left-0"
        style={props}
      ></animated.div>
    </div>
  )
}

export { VideoSegmentControls, VideoSegmentProgress }