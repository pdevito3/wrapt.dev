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
    pages['add-bounded-context'],
    pages['add-entity'],
    pages['add-entity-property'],
    pages['new-domain'],
    pages['version-command'],
  ],
  'File Templates': [
    pages['bounded-contexts-template'],
    pages['domain-template'],
    pages['entity-template'],
  ],
  'Template Properties': [
    pages['authorization-settings'],
    pages['bounded-contexts'],
    pages['db-context'],
    pages['entities'],
    pages['git'],
    pages['multiple-environments'],
    pages['swagger'],
  ],
  'Additional Resources': [
    pages['all-about-auth-in-dotnet-core'],
    pages['logging'],
    pages['migrations'],
  ],
  'Examples': [
    pages['examples'],
  ],
}
