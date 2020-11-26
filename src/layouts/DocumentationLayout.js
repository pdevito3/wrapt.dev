import { SidebarLayout } from 'src/layouts/SidebarLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
// import twitterSquare from '@/img/twitter-square.jpg'
// import { Title } from 'src/components/Title'
import { documentationNav } from 'src/navs/documentation'

export function DocumentationLayout({children, ...props}) {
  const router = useRouter()

  return (
    <>
      {/* <Title suffix={router.pathname === '/' ? undefined : 'Dotnet Accelerate'}>
        {props.layoutProps.meta.metaTitle || props.layoutProps.meta.title}
      </Title> */}
      <Head>
        <meta key="twitter:card" name="twitter:card" content="summary" />
        <meta
          key="twitter:image"
          name="twitter:image"
          // content={`https://dotnetaccelerate.com${twitterSquare}`}
        />
      </Head>
      <>
        <SidebarLayout nav={documentationNav} {...props} />
        {children}
      </>
    </>
  )
}

export default DocumentationLayout