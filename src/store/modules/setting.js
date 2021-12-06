/**
 * @description 主题全局配置状态
 */

import { themeConfig } from '@/config/theme'
import { setting } from '@/config/setting'
import { getLanguage, setLanguage, setSettings, getSettings } from '@/utils/cookies'

const { mode, theme, fixedHead, fullScreen, refresh, collapse, notice, isBreadcrumb, isLogo, tag } =
  themeConfig
const { lang } = setting

const state = {
  routerView: true, // 是否显示路由
  isDrawerSetting: false, // 是否打开主题设置
  isMobile: false, // 是否为移动端
  isDrawer: false, // 是否展开移动端菜单
  isFullScreen: false, // 是否显示全屏
  collapse, // 是否折叠菜单
  fullScreen, // 是否显示全屏
  refresh, // 是否显示刷新
  mode: getSettings() ? getSettings().mode : mode, // 模式(菜单在上方/在左侧)
  theme, // 主题
  fixedHead, // 是否固定头部
  notice, // 是否显示通知
  isBreadcrumb, // 是否显示面包导航
  isLogo, // 是否显示logo
  tag, // 是否显示标签
  lang: getLanguage() || lang // 当前语言
}

const getters = {
  routerView: (state) => state.routerView,
  isMobile: (state) => state.isMobile,
  isDrawer: (state) => state.isDrawer,
  isFullScreen: (state) => state.isFullScreen,
  theme: (state) => state.theme,
  isDrawerSetting: (state) => state.isDrawerSetting,
  fullScreen: (state) => state.fullScreen,
  refresh: (state) => state.refresh,
  fixedHead: (state) => state.fixedHead,
  notice: (state) => state.notice,
  isBreadcrumb: (state) => state.isBreadcrumb,
  isLogo: (state) => state.isLogo,
  tag: (state) => state.tag,
  mode: (state) => state.mode,
  settings: (state) => state,
  lang: (state) => state.lang
}

const mutations = {
  CHANGE_COLLAPSE: (state) => {
    state.collapse = !state.collapse
  },
  CHANGE_FULL_SCREEN: (state, flag) => {
    state.isFullScreen = flag
  },
  SET_ROUTER_VIEW: (state) => {
    state.routerView = !state.routerView
  },
  CHANGE_IS_MOBILE: (state, flag) => {
    state.isMobile = flag
  },
  CHANGE_IS_DRAWER: (state, flag) => {
    state.isDrawer = flag
  },
  SET_THEME: (state, theme) => {
    state.theme = theme
  },
  CHANGE_SETTING_DRAWER: (state, flag) => {
    state.isDrawerSetting = flag
  },
  CHANGE_BREADCRUMB: (state, flag) => {
    state.isBreadcrumb = flag
  },
  CHANGE_TAG: (state, flag) => {
    state.tag = flag
  },
  CHANE_MODE: (state, mode) => {
    state.mode = mode
  },
  SET_SETTING_OPTIONS: (state, options) => {
    setSettings(options.value)
    Object.assign(state, { ...options.value })
  },
  CHANGE_LANGUAGE: (state, lang) => {
    setLanguage(lang)
    state.lang = lang
  }
}

const actions = {
  /**
   * 切换展开收起
   */
  changeCollapse: ({ commit }) => {
    commit('CHANGE_COLLAPSE')
  },
  /**
   * 切换是否全屏
   */
  changeFullScreen: ({ commit }, flag) => {
    commit('CHANGE_FULL_SCREEN', flag)
  },
  /**
   * 是否刷新路由
   */
  setRouterView: ({ commit }, flag) => {
    commit('SET_ROUTER_VIEW', flag)
  },
  /**
   * 是否为移动端
   */
  changeMobile: ({ commit }, flag) => {
    commit('CHANGE_IS_MOBILE', flag)
  },
  /**
   * 是否展开移动端菜单
   */
  changeDrawer: ({ commit }, flag) => {
    commit('CHANGE_IS_DRAWER', flag)
  },
  /**
   * 设置主题
   * 系统默认：blue | green | red | default
   */
  setTheme: ({ commit }, theme) => {
    commit('SET_THEME', theme)
  },
  /**
   * 是否打开主题设置
   * flag: true | false
   */
  setSettingDrawer: ({ commit }, flag) => {
    commit('CHANGE_SETTING_DRAWER', flag)
  },
  /**
   * 是否显示面包导航
   * flag: true | false
   */
  setBreadcrumb: ({ commit }, flag) => {
    commit('CHANGE_BREADCRUMB', flag)
  },
  /**
   * 是否显示标签
   * flag: true | false
   */
  setTag: ({ commit }, flag) => {
    commit('CHANGE_TAG', flag)
  },
  /**
   * 切换布局
   * mode: vertical | horizontal
   */
  setMode: ({ commit }, mode) => {
    commit('CHANE_MODE', mode)
  },
  /**
   * 切换语言
   * lang 语言: zh-cn | en
   */
  changeLanguage: ({ commit }, lang) => {
    commit('CHANGE_LANGUAGE', lang)
  },
  /**
   * 设置主题配置信息
   * options: 配置项
   */
  setSettingOptions: ({ commit }, options) => {
    commit('SET_SETTING_OPTIONS', options)
  }
}

export default {
  getters,
  state,
  mutations,
  actions
}
