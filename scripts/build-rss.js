import fs from 'fs';
import ReactDOMServer from 'react-dom/server'
import { MDXProvider } from '@mdx-js/react'
import { Feed } from 'feed'

// import { mdxComponents } from 'src/components/Post'
import getAllPostPreviews from 'src/utils/getAllPostPreviews'

const blogUrl = 'https://wrapt.dev/blog'
const siteUrl = 'https://wrapt.dev'

const feed = new Feed({
  title: 'Wrapt Blog',
  description: 'Keep up with useful web dev tips and follow my progress on building Craftsman.',
  id: blogUrl,
  link: blogUrl,
  language: 'en',
  image: `${siteUrl}/favicon-32x32.png`,
  favicon: `${siteUrl}/favicon.ico`,
  copyright: `All rights reserved ${new Date().getFullYear()}, Wrapt`,
  feedLinks: {
    rss: `${blogUrl}/feed.xml`,
    json: `${blogUrl}/feed.json`,
    atom: `${blogUrl}/atom.xml`,
  },
  author: [
    {
      name: 'Paul DeVito',
      email: 'pdevito3@gmail.com',
      link: 'https://twitter.com/@pdevito3',
    }
  ],
})

getAllPostPreviews().forEach(({ link, module: { default: Content } }) => {
  let blogmeta = Content.layoutProps.blogmeta;
  // const mdx = (
  //   // <MDXProvider components={mdxComponents}>
  //   <MDXProvider>
  //     <Content />
  //   </MDXProvider>
  // )
  // const html = ReactDOMServer.renderToStaticMarkup(mdx)
  // const postText = `<p><em>(The post <a href="${blogUrl + link}">${
  //   meta.title
  // }</a> appeared first on <a href="${blogUrl}">Wrapt Blog</a>.)</em></p>`
    feed.addItem({
      title: blogmeta.title,
      id: blogmeta.title,
      link: `${blogUrl}${link}`,
      description: blogmeta.description,
      content: null,
      author: [
        {
          name: 'Paul DeVito',
          email: 'pdevito3@gmail.com',
          link: 'https://twitter.com/@pdevito3',
        }
      ],
      date: new Date(blogmeta.date),
      image:  siteUrl + blogmeta.image,
      // ...(blogmeta.discussion
      //   ? {
      //       comments: blogmeta.discussion,
      //       extensions: [
      //         {
      //           name: '_comments',
      //           objects: {
      //             about: 'Link to discussion forum',
      //             comments: blogmeta.discussion,
      //           },
      //         },
      //       ],
      //     }
      //   : {}),
    })
})

fs.writeFileSync('./out/feed.xml', feed.rss2())
fs.writeFileSync('./out/atom.xml', feed.atom1())
fs.writeFileSync('./out/feed.json', feed.json1())