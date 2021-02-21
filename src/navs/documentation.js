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
  'Commands': [
    pages['add-entity'],
    pages['add-entity-property'],
    pages['new-micro'],
    pages['new-api'],
  ],
  'Templates': [
    pages['api-template'],
    pages['add-entity-template'],
    pages['microservice-template'],
  ],
  'Template Objects': [
    pages['authorization-settings'],
    pages['db-context'],
    pages['entities'],
    pages['gateway'],
    pages['git'],
    pages['microservice'],
    pages['multiple-environments'],
    pages['solution-name'],
    pages['swagger'],
  ],
  'Additional Resources': [
    pages['all-about-auth-in-dotnet-core'],
    pages['logging'],
    pages['migrations'],
  ],
  // 'Examples': [
    // pages['basic-api'],
    // pages['basic-microservice'],
    // pages['api-with-auth'],
    // pages['add-entity'],
  // ],
}
