import Head from 'next/head'
import NextLink from 'next/link'
import PageTitle from 'src/components/PageTitle'
// import Link from 'next/link'
import { MDXProvider } from '@mdx-js/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import BlogTag from 'src/components/BlogTag'

export function BlogContentLayout({ children, blogmeta }) {
  const mdxComponents = {
    pre: ({ className, ...props }) => (
      <pre className={`${className} rounded-md bg-gray-800 py-3 px-4 overflow-x-auto`} {...props} />
    ),
    'pre.code': ({ className, ...props }) => (
      <code className={`${className} text-gray-200`} {...props} />
    ),
  }
  const router = useRouter();
  function formatDate(input) { 
    let formatted = dayjs(input).format('dddd, MMMM DD, YYYY');
    return formatted;
   };

  return (
    <article className="divide-y divide-gray-200">
      <Head>
        <title>{blogmeta.title} – Wrapt</title>
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@pdevito3" />
        <meta name="twitter:creator" content="@pdevito3" />
        <meta name="twitter:title" content={`${blogmeta.title} – Wrapt`} />
        <meta name="twitter:description" content={blogmeta.description} />
        {/* {blogmeta.image ? 
          (
            <>
              <meta name="twitter:card" content="summary_large_image" />
              <meta
                name="twitter:image"
                content={`https://wrapt.dev/blog$${blogmeta.image}`}
              />
            </>
          ) : (
            <>
              <meta name="twitter:card" content="summary" />
              <meta
                name="twitter:image"
                content={`https://wrapt.dev/blog$${smallCard}`}
              />
            </>
        )} */}
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={`https://wrapt.dev/${blogmeta.image}`}
        />
        <meta key="og:url" property="og:url" content={`https://wrapt.dev${router.pathname}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${blogmeta.title} – Wrapt`} />
        <meta property="og:description" content={blogmeta.description} />
        <meta property="og:image" content={`https:/wrapt.dev${blogmeta.image}`} />
        <meta name="description" content={blogmeta.description}></meta>
      </Head>
      <header className="">
        <div className="px-4 py-6 mx-auto xl:pb-8 md:px-10 md:max-w-4xl lg:max-w-6xl">
          <div className="space-y-1 text-center">
            <div className="pt-2">
              <PageTitle>{blogmeta.title}</PageTitle>
            </div>
            
            <div className="py-2">
              <span className="sr-only">Category</span>
              <p className="font-medium uppercase text-violet-600">
                {blogmeta.category}
              </p>
            </div>

            <div className="hidden py-3 sm:block">
              <ul className="flex items-center justify-center space-x-3">
              {blogmeta.tags.map((tag) => (
                <li key={tag}><BlogTag tag={tag} /></li>
              ))}
              </ul>
            </div>

            <dl className="space-y-10">
              <div>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6 text-gray-500">
                  <time dateTime={blogmeta.date}>{formatDate(blogmeta.date)}</time>
                </dd>
              </div>
            </dl>
          </div>
          <dl className="pt-6">
            <dt className="sr-only">Authors</dt>
            <dd>
              <ul className="flex justify-start space-x-8 sm:space-x-12 xl:space-x-0 xl:space-y-8">
                {blogmeta.authors.map((author) => (
                  <li key={author.twitter} className="flex items-center space-x-2">
                    <img src={author.avatar} alt="" className="w-10 h-10 rounded-full" />
                    <dl className="text-sm font-medium leading-5 whitespace-no-wrap">
                      <dt className="sr-only">Name</dt>
                      <dd className="text-gray-900">{author.name}</dd>
                      <dt className="sr-only">Twitter</dt>
                      <dd>
                        <a
                          href={`https://twitter.com/${author.twitter}`}
                          className="text-violet-500 hover:text-violet-600"
                        >
                          @{author.twitter}
                        </a>
                      </dd>
                    </dl>
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
        </div>
      </header>
      <div
        className="px-4 pb-16 mx-auto divide-y divide-gray-200 xl:divide-y-0 xl:pb-20 md:px-10 md:max-w-4xl lg:max-w-6xl"
        style={{ gridTemplateRows: 'auto 1fr' }}
      >
        <div className="w-full">
          <div className="pt-10 pb-8 prose">
            <MDXProvider components={mdxComponents}>{children}</MDXProvider>
          </div>
        </div>
      </div>
        <footer className="text-sm font-medium leading-5 divide-y divide-gray-200 xl:col-start-1 xl:row-start-2">
          <div className="flex items-center justify-center px-3 py-4 sm:justify-start ">
            <NextLink href="/blog">
              <a className="text-lg text-violet-500 hover:text-violet-600 sm:text-base">&larr; Back to the blog</a>
            </NextLink>
          </div>
        </footer>
        {blogmeta.footer && (
          <div className="pt-6 pb-16" dangerouslySetInnerHTML={{ __html: blogmeta.footer }} />
        )}
        {!blogmeta.footer && blogmeta.discussion && (
          <div className="pt-6 pb-16">
            <p>
              Want to talk about this post?{' '}
              <a href={blogmeta.discussion} className="font-medium text-violet-500 hover:text-violet-600">
                Discuss this on GitHub &rarr;
              </a>
            </p>
          </div>
        )}
    </article>
  )
}
