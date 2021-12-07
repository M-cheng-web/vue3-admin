import { createI18n } from 'vue-i18n/index'

import { getLanguage } from '@/utils/cookies'

import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'

// User defined lang
import enLocale from './lang/en'
import zhLocale from './lang/zh-cn'

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  'zh-cn': {
    ...zhLocale,
    ...elementZhLocale
  }
}

export const getLocale = () => {
  // 获取cookie中存储的语言
  const cookieLanguage = getLanguage()
  if (cookieLanguage) {
    return cookieLanguage
  }

  // 获取浏览器的地区
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }

  return 'zh'
}

const i18n = createI18n({
  locale: getLocale(),
  messages: messages
})

export default i18n
