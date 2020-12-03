import { createPageList } from 'src/utils/createPageList'

const pages = createPageList(
  require.context(`../pages/docs/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs'
)

export const documentationNav = {
  'Getting Started': [
    pages['overview'],
    pages['installation'],
    // pages['quickstart,']
    // {title: 'API Template File', published: false},
  ],
  'Template File': [
    pages['template-file-overview'],
    pages['solution-name'],
    pages['db-context'],
    pages['entities'],
    pages['swagger'],
    pages['git'],
    pages['multiple-environments'],
  ],
  'Commands': [
    pages['add-entity'],
    pages['add-entity-property'],
    pages['new-api'],
  ],
  'Additional Resources': [
    pages['migrations'],
  ],
}
