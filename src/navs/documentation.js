import { createPageList } from 'src/utils/createPageList'

const pages = createPageList(
  require.context(`../pages/docs/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs'
)

export const documentationNav = {
  'The Essentials': [
    pages['installation'],
    pages['how-it-works'],
    pages['first-example'],
    pages['project-organization'],
    pages['customizing-wrapt-projects'],
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
