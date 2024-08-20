import Head from 'next/head'
import { useRouter } from 'next/router'
// import twitterSquare from 'src/img/twitter-square.jpg'
import { Title } from 'src/components/Title'
import twitterSquare from 'src/img/twitter-square.jpg'
import { SidebarLayout } from 'src/layouts/SidebarLayout'
import { documentationNav } from 'src/navs/documentation'

export function DocumentationLayout(props) {
  const router = useRouter();

  return (
    <>
      <Title suffix={router.pathname === '/' ? undefined : 'Wrapt'}>
        {props.layoutProps.meta.metaTitle || props.layoutProps.meta.title}
      </Title>
      
      <Head>
        {
          !router.pathname.startsWith('/blog') &&
          <>
            <meta key="twitter:card" name="twitter:card" content="summary" />
            <meta
              key="twitter:image"
              name="twitter:image"
              content={`https://wrapt.dev${twitterSquare}`}
            />
            <meta
              name="description"
              content="Documentation for the Wrapt framework. Scaffold an entire .NET Web API with a simple yaml or json file."
            />
          </>
        }
      </Head>
      <SidebarLayout nav={documentationNav} {...props} />
    </>
  )
}

export default DocumentationLayout