import getAllPostPreviews from 'src/utils/getAllPostPreviews'

export async function getStaticProps() {
  return {
    props: {
      posts: getAllPostPreviews().map((post) => ({
        title: post.module.blogmeta.title,
        link: `$blog/${post.link}`,
        blogmeta: post.module.blogmeta
      })),
    },
  }
}