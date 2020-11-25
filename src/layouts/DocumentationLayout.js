import { SidebarLayout } from '../layouts/SidebarLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
// import twitterSquare from '@/img/twitter-square.jpg'
// import { Title } from 'src/components/Title'
import { documentationNav } from '../navs/documentation'

export function DocumentationLayout(props) {
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
      <SidebarLayout nav={documentationNav} {...props} />
    </>
  )
}

export default DocumentationLayout