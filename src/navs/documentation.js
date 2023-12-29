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
    pages['add-auth-server'],
    pages['add-bus'],
    pages['add-bounded-context'],
    pages['add-consumer'],
    pages['add-producer'],
    pages['add-entity'],
    pages['add-feature'],
    pages['add-message'],
    pages['new-domain'],
    pages['new-example'],
    pages['register-producer'],
    pages['version-command'],
  ],
  'File Templates': [
    pages['auth-server-template'],
    pages['bounded-contexts-template'],
    pages['bus-template'],
    pages['consumer-template'],
    pages['domain-template'],
    pages['entity-template'],
    pages['message-template'],
    pages['producer-template'],
  ],
  'Template Properties': [
    pages['bounded-contexts'],
    pages['db-context'],
    pages['entities'],
    pages['git'],
    pages['environment'],
    pages['swagger'],
  ],
  'Additional Resources': [
    pages['auth-with-wrapt'],
    pages['jobs-with-hangfire'],
    pages['communicating-between-bounded-contexts'],
    pages['logging'],
    pages['migrations'],
    pages['permissions'],
    pages['value-objects'],
  ],
  'Examples': [
    pages['examples'],
  ],
}
