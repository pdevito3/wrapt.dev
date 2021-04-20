import { SidebarLayout } from 'src/layouts/SidebarLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
// import twitterSquare from 'src/img/twitter-square.jpg'
import { Title } from 'src/components/Title'
import { documentationNav } from 'src/navs/documentation'
import twitterSquare from 'src/img/twitter-square.jpg'

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
              content="Documentation for the Wrapt framework. Scaffold an entire .NET 5 Web API with a simple yaml or json file."
            />
          </>
        }
      </Head>
      <SidebarLayout nav={documentationNav} {...props} />
    </>
  )
}

export default DocumentationLayout