import React from 'react'

function OptionalPill(props) {
  const paddingLeft = props.padLeft === "sm" ? "pl-3" : "";

  return (
    <span className={paddingLeft}>
      <span class="inline-flex items-center px-6 py-1.5 rounded-full text-sm font-medium bg-blue-200 text-blue-800">
        Optional
      </span>
    </span>
  )
}

export default OptionalPill
