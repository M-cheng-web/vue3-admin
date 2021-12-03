import { setting } from '@/config/setting'
const { title } = setting

export const getPageTitle = (pageTitle) => {
  if (pageTitle) {
    return `${pageTitle}-${title}`
  }
  return `${title}`
}
