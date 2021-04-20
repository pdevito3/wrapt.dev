import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import BlogHeader from 'src/components/BlogHeader'
import getAllPostPreviews from 'src/utils/getAllPostPreviews'
import twitterBlogCard from 'src/img/twitter-large-blog-card.jpg'
import BlogTag from 'src/components/BlogTag'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { TagIcon } from '@heroicons/react/outline'
import { ColorSwatchIcon } from '@heroicons/react/outline'
import { Router, useRouter } from 'next/router'
import dayjs from 'dayjs'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function index() {
  const router = useRouter();
  function formatDate(input) { 
    let formatted = dayjs(input).format('dddd, MMMM DD, YYYY');
    return formatted;
   };
  const posts = getAllPostPreviews();

  const [filteredPosts, setFilteredPosts] = useState(getAllPostPreviews());
  const [tagFilter, setTagFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  
  const tags = [...new Set(posts.flatMap(post => post.module.default.layoutProps.blogmeta.tags))].sort();
  const categories = [...new Set(posts.map(post => post.module.default.layoutProps.blogmeta.category))].sort();

  // definitely need to change this to a state machine if this gets any more complex. messy as is
  useEffect(() => {
    if(tagFilter !== null) {
      setFilteredPosts(posts.filter(post => post.module.default.layoutProps.blogmeta.tags.includes(tagFilter)))
      return;
    }

    if(categoryFilter !== null) {
      setFilteredPosts(posts.filter(post => post.module.default.layoutProps.blogmeta.category === categoryFilter))
      return;
    }
    
      setFilteredPosts(posts);
  }, [tagFilter, categoryFilter])

  return (
    <div className="divide-y divide-gray-200 px-4 md:px-10 md:max-w-4xl lg:max-w-6xl mx-auto">
      <Head>
        {
          router.pathname === '/blog' && 
          <>
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
            <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="/feed.xml" />
            <link rel="alternate" type="application/atom+xml" title="Atom 1.0" href="/atom.xml" />
            <link rel="alternate" type="application/json" title="JSON Feed" href="/feed.json" />
          </>
        }
      </Head>
      <div className="pt-6 md:pb-2 space-y-2 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Wrapt Blog
        </h1>
        <div className="md:flex md:items-center md:justify-between">
          <p className="text-lg leading-7 text-gray-500">
            Keep up with useful web dev tips and follow my progress on building Craftsman.
          </p>

          <div className="space-x-2 flex items-center justify-start">

            <Menu as="div" className="relative inline-block text-left pt-5 md:pt-0">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    <TagIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                      Tags
                    </Menu.Button>
                  </div>

                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    
                    {/* note that the media query is broken atm and it will always show on the left 🤷🏼‍♂️. have an issue in with TW */}
                    <Menu.Items
                      static
                      className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none md:origin-top-right md:right-0 md:left-auto"
                    >
                      <div className="py-1">
                        
                      {
                        tags.map((tag) => {
                          return (
                            <Menu.Item key={tag}>
                              {({ active }) => (
                                <button
                                  onClick={() => { setCategoryFilter(null); setTagFilter(tag); }}
                                  className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm w-full text-left'
                                  )}
                                >
                                  {tag}
                                </button>
                              )}
                            </Menu.Item>
                          )
                        })
                      }
                        
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>

            
            <Menu as="div" className="relative inline-block text-left pt-5 md:pt-0">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    <ColorSwatchIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                      Categories
                    </Menu.Button>
                  </div>

                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="py-1">
                        
                      {
                        categories.map((category) => {
                          return (
                            <Menu.Item key={category}>
                              {({ active }) => (
                                <button
                                  onClick={() => {  setTagFilter(null); setCategoryFilter(category); }}
                                  className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm w-full text-left'
                                  )}
                                >
                                  {category}
                                </button>
                              )}
                            </Menu.Item>
                          )
                        })
                      }
                        
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </div>
        <div className={tagFilter || categoryFilter ? "block" : "hidden"}>
          <span className="inline-flex rounded-full items-center py-1 pl-3 pr-2 text-sm font-medium bg-indigo-100 text-indigo-700">
            {tagFilter ?? categoryFilter}
            <button
              onClick={() => { setTagFilter(null); setCategoryFilter(null); }}
              type="button"
              className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
            >
              <span className="sr-only">Remove filter option</span>
              <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
        </div>
      </div>
      <div className="mt-4">
        <div className="mt-4 md:mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {filteredPosts.map(({ link, module: { default: { layoutProps: { blogmeta } } }  }) => {
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
                          <p className="text-sm font-medium text-violet-600 uppercase">
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
                            {formatDate(new Date(blogmeta.date))}
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
