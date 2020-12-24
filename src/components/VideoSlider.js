import React from 'react'

function VideoSlider({ trackProps, handles}) {
  return (
    <div
      {...trackProps()}
      className="group h-1.5 bg-gray-900 rounded shadow hover:cursor-pointer"
    >
      {handles.map(({ getHandleProps }) => (
        <button
          key={Math.random()}
          {...getHandleProps()}
          className="h-5 w-5 rounded-full bg-violet-400 shadow focus:bg-violet-500 hover:bg-violet-500"
        />
      ))}
    </div>
  )
}

export default VideoSlider
