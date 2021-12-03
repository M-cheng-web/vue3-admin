import { setting } from '@/config/setting'
import Cookies from 'js-cookie'
const { langKey, themeKey } = setting

export function getLanguage () {
  return Cookies.get(langKey)
}

export function setLanguage (lang) {
  return Cookies.set(langKey, lang)
}

export function getSettings () {
  const settings = Cookies.get(themeKey)
  return settings ? JSON.parse(settings) : null
}

export function setSettings (theme) {
  return Cookies.set(themeKey, JSON.stringify(theme))
}
