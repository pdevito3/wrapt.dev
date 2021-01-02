import '../styles/tailwind.css'
import { useState, useEffect, Fragment } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import { Header } from 'src/components/Header'
import twitterLargeCard from 'src/img/twitter-large-card.jpg'
import { ResizeObserver } from '@juggle/resize-observer'
import { Title } from 'src/components/Title'
// import 'intersection-observer'

if (typeof window !== 'undefined' && !('ResizeObserver' in window)) {
  window.ResizeObserver = ResizeObserver
}

function MyApp({ Component, pageProps, router }) {
  let [navIsOpen, setNavIsOpen] = useState(false)

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
      </Head>
      {router.pathname !== '/' && (
        <Header navIsOpen={navIsOpen} onNavToggle={(isOpen) => setNavIsOpen(isOpen)} />
      )}
      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
