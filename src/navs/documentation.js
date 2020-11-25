// import { createPageList } from '@/utils/createPageList'

// const pages = createPageList(
//   require.context(`../pages/docs/?meta=title,shortTitle,published`, false, /\.mdx$/),
//   'docs'
// )
const pages = [];
export const documentationNav = {
  'Getting started': [
    pages['installation'],
    {
      title: 'Release Notes',
      href: 'https://blog.tailwindcss.com/tailwindcss-v2',
    },
    pages['upgrading-to-v2'],
    pages['using-with-preprocessors'],
    pages['optimizing-for-production'],
    pages['browser-support'],
    pages['intellisense'],
  ],
  'New Commands': [
    pages['new:api'],
  ],
}
