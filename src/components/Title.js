import Head from 'next/head'
import { useRouter } from 'next/router'

export function Title({ suffix, children }) {
  let title = children + (suffix ? ` - ${suffix}` : '')
  const router = useRouter();

  return (
    <Head>
      {
          !router.pathname.startsWith('/blog') &&
          <>
            <title key="title">{title}</title>
            <meta key="twitter:title" name="twitter:title" content={title} />
            <meta key="og:title" property="og:title" content={title} />
          </>
      }
    </Head>
  )
}
