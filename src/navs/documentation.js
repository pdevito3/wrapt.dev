import { createPageList } from 'src/utils/createPageList'

const pages = createPageList(
  require.context(`../pages/docs/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs'
)

export const documentationNav = {
  'The Essentials': [
    pages['how-it-works'],
    pages['installation'],
    pages['tutorial'],
    pages['project-organization'],
    pages['customizing-wrapt-projects'],
  ],
  'Templates': [
    pages['api-template'],
    // pages['microservice-template'],
    // pages['add-entity-template'],
  ],
  'Template Objects': [
    pages['authorization-settings'],
    pages['db-context'],
    pages['entities'],
    pages['git'],
    pages['multiple-environments'],
    pages['solution-name'],
    pages['swagger'],
  ],
  'Commands': [
    pages['add-entity'],
    pages['add-entity-property'],
    pages['new-api'],
  ],
  'Additional Resources': [
    pages['migrations'],
    pages['logging'],
  ],
  // 'Examples': [
    // pages['basic-api'],
    // pages['basic-microservice'],
    // pages['api-with-auth'],
    // pages['add-entity'],
  // ],
}
