import React from 'react'

function FeatureBlock({title, details}) {
  return (
    <div className="flex">
      {/* Heroicon name: check */}
      <svg className="flex-shrink-0 h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <div className="ml-3">
        <dt className="text-lg leading-6 font-medium text-gray-900">
          {title}
        </dt>
        <dd className="mt-2 text-base text-gray-500">
          {details}
        </dd>
      </div>
    </div>
  )
}

export default FeatureBlock
