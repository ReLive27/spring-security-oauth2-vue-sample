import defaultSettings from '@/settings'

const title = defaultSettings.title || 'OAuth2 Vue Template'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
