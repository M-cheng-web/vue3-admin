/**
 * @description 用户相关
 */

import { getUserInfo, login } from '@/api/user'
import { getAccessToken, removeAccessToken, setAccessToken } from '@/utils/accessToken'
import { setting } from '@/config/setting'
// import { resetRouter } from '@/router'
import i18n from '@/locales'
import { ElMessage, ElNotification } from 'element-plus'

const { title, tokenName } = setting
const { global } = i18n

const state = {
  accessToken: getAccessToken(), // token
  username: '', // 用户名
  avatar: '', // 头像
  permissions: [] // 权限
}

const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  permissions: (state) => state.permissions
}
const mutations = {
  setAccessToken (state, accessToken) {
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  setUsername (state, username) {
    state.username = username
  },
  setAvatar (state, avatar) {
    state.avatar = avatar
  },
  setPermissions (state, permissions) {
    state.permissions = permissions
  }
}
const actions = {
  setPermissions ({ commit }, permissions) {
    commit('setPermissions', permissions)
  },
  /**
   * 用户登录
   */
  async login ({ commit }, userInfo) {
    const { data } = await login(userInfo)
    const accessToken = data[tokenName]
    if (accessToken) {
      commit('setAccessToken', accessToken)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? global.t('sayHi.early')
          : hour <= 11
            ? global.t('sayHi.morning')
            : hour <= 13
              ? global.t('sayHi.noon')
              : hour < 18
                ? global.t('sayHi.afternoon')
                : global.t('sayHi.evening')
      ElNotification({
        title: `${thisTime}!`,
        message: `${global.t('notice.msg')}${title}!`,
        type: 'success'
      })
    } else {
      ElMessage.error(`登录接口异常,未正确返回${tokenName}...`)
    }
  },
  /**
   * 获取用户信息
   */
  async getUserInfo ({ commit, state }) {
    const { data } = await getUserInfo(state.accessToken)
    if (!data) {
      ElMessage.error('验证失败，请重新登录...')
      return false
    }
    const { permissions, username, avatar } = data
    if (permissions && username && Array.isArray(permissions)) {
      commit('setPermissions', permissions)
      commit('setUsername', username)
      commit('setAvatar', avatar)
      return permissions
    } else {
      ElMessage.error('用户信息接口异常')
      return false
    }
  },
  /**
   * 用户退出登录
   */
  async logout ({ dispatch }) {
    await dispatch('resetAccessToken')
    // await resetRouter() 暂时不用,否则二次登录会有死循环bug
  },
  /**
   * 清空用户相关信息
   */
  resetAccessToken ({ commit }) {
    commit('setPermissions', [])
    commit('setAccessToken', '')
    removeAccessToken()
  }
}
export default { state, getters, mutations, actions }
