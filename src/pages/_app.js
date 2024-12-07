import { ResizeObserver } from '@juggle/resize-observer'
import Head from 'next/head'
import Router from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import BlogHeader from 'src/components/BlogHeader'
import { Header } from 'src/components/Header'
import { Title } from 'src/components/Title'
import twitterLargeCard from 'src/img/twitter-large-card.png'
import '../styles/tailwind.css'
// import 'intersection-observer'
import { Analytics } from "@vercel/analytics/react"

if (typeof window !== 'undefined' && !('ResizeObserver' in window)) {
  window.ResizeObserver = ResizeObserver
}

function MyApp({ Component, pageProps, router }) {
  let [navIsOpen, setNavIsOpen] = useState(false)
  const [header, setHeader] = useState(null)

  // move to state machine for fun?
  useEffect(() => {
    let isHomepage = router.pathname === '/';
    let isBlog = router.pathname.startsWith("/blog");

    setHeader(null);
    if(!isHomepage){
      setHeader(<Header navIsOpen={navIsOpen} onNavToggle={(isOpen) => setNavIsOpen(isOpen)} />);
    }
    if(isBlog) {
      setHeader(<BlogHeader />)
    }
  }, [navIsOpen, setNavIsOpen, setHeader, router.pathname]);

  useEffect(() => {
    if (!navIsOpen) return
    function handleRouteChange() {
      setNavIsOpen(false)
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [navIsOpen])

  const Layout = Component.layoutProps?.Layout || Fragment
  const layoutProps = Component.layoutProps?.Layout
    ? { layoutProps: Component.layoutProps, navIsOpen, setNavIsOpen }
    : {}
  const meta = Component.layoutProps?.meta || {}
  const description =
    meta.metaDescription || meta.description || 'Documentation for the Wrapt framework.'

  return (
    <>
      <Title suffix="Wrapt">{meta.metaTitle || meta.title}</Title>
      <Head>
        {
          !router.pathname.startsWith('/blog') &&
          <>
            <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
            <meta key="twitter:site" name="twitter:site" content="@pdevito3" />
            <meta key="twitter:description" name="twitter:description" content={description} />
            <meta
              key="twitter:image"
              name="twitter:image"
              content={`https://wrapt.dev${twitterLargeCard}`}
            />
            <meta key="twitter:creator" name="twitter:creator" content="@pdevito3" />
            <meta
              key="og:url"
              property="og:url"
              content={`https://wrapt.dev${router.pathname}`}
            />
            <meta key="og:type" property="og:type" content="article" />
            <meta key="og:description" property="og:description" content={description} />
            <meta
              key="og:image"
              property="og:image"
              content={`https://wrapt.dev${twitterLargeCard}`}
            />
          </>
        }
      </Head>
      {header}
      <Layout {...layoutProps}>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </>
  )
}

export default MyApp
