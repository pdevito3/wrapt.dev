import React from 'react'

function BlogTag({ tag }) {
  return (
    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 lowercase">
      {tag}
    </span>
  )
}

export default BlogTag
