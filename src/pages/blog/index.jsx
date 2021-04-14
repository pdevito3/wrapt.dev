import React, { useState, useEffect } from 'react'
import tinytime from 'tinytime'
import Link from 'next/link'
import Head from 'next/head'
import BlogHeader from 'src/components/BlogHeader'
import getAllPostPreviews from 'src/utils/getAllPostPreviews'
import twitterBlogCard from 'src/img/twitter-large-blog-card.jpg'
import BlogTag from 'src/components/BlogTag'

function index() {
  const posts = getAllPostPreviews()
  const postDateTemplate = tinytime('{dddd}, {MMMM} {DD}, {YYYY}');

  return (
    <div className="divide-y divide-gray-200 px-4 md:px-10 md:max-w-4xl lg:max-w-6xl mx-auto">
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@pdevito3" />
        <meta name="twitter:creator" content="@pdevito3" />
        <meta name="twitter:title" content="Blog – Wrapt" />
        <meta name="twitter:description" content="Keep up with useful web dev tips and follow my progress on building Craftsman." />
        <meta key="twitter:image" name="twitter:image" content={`https://wrapt.dev${twitterBlogCard}`} />
        <meta property="og:url" content="https://wrapt.dev/blog" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Blog – Wrapt" />
        <meta property="og:description" content="Keep up with useful web dev tips and follow my progress on building Craftsman." />
        <meta key="og:image" name="og:image" content={`https://wrapt.dev${twitterBlogCard}`} />
        <title>Blog – Wrapt</title>
        <meta name="description" content="Keep up with useful web dev tips and follow my progress on building Craftsman." />
      </Head>
      <div className="pt-6 pb-4 space-y-2 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Wrapt Blog
        </h1>
        <p className="text-lg leading-7 text-gray-500">
          Keep up with useful web dev tips and follow my progress on building Craftsman.
        </p>
      </div>
      <div className="mt-4">
        <div className="mt-4 md:mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {posts.map(({ link, module: { default: { layoutProps: { blogmeta } } }  }) => {
            return (
              <div key={link} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <Link href={`/blog${link}`}>
                      <a className="block mt-2">
                        <p className="text-xl font-semibold text-gray-900">
                          {blogmeta.title}
                        </p>
                        <div className="py-1.5">
                          {/* {blogmeta.tags.slice(0, 1).map((tag) => {
                            return (
                              <BlogTag key={tag} tag={tag} />
                            )
                          })} */}
                          <p className="text-sm font-medium text-purple-600 uppercase">
                            {blogmeta.category}
                          </p>
                        </div>
                        <p className="mt-3 text-base text-gray-500">
                          {blogmeta.description}
                        </p>
                      </a>
                    </Link>
                  </div>
                    
                  {blogmeta.authors.slice(0, 1).map((author) => {
                    return (
                      <div key={author.name} className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                          <a href={`https://twitter.com/${author?.twitter}`} target="_blank" >
                            <span className="sr-only">{author.name}</span>
                            <img className="h-10 w-10 rounded-full" src={author.avatar} alt="author avatar" />
                          </a>
                        </div>

                        
                        <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          <a href={`https://twitter.com/${author?.twitter}`} target="_blank" className="hover:underline">
                            {author.name}
                            <span>{blogmeta.authors.length > 1 ? ' et al.' : null}</span>
                          </a>
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime={blogmeta.date}>
                            {postDateTemplate.render(new Date(blogmeta.date))}
                          </time>
                          {/* <span aria-hidden="true">
                            ·
                          </span> */}
                        </div>
                      </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      
      </div>
    </div>
  )
}

export default index
