/**
 * @description router
 */

import { asyncRoutes, constantRoutes } from '@/router'
import { getRouterList } from '@/api/router'
import { convertRouter, filterAsyncRoutes } from '@/utils/handleRoutes'

const state = () => ({
  routes: [], // 路由
  partialRoutes: [] // 部分路由
})
const getters = {
  routes: (state) => state.routes,
  partialRoutes: (state) => state.partialRoutes
}
const mutations = {
  setRoutes (state, routes) {
    state.routes = constantRoutes.concat(routes)
  },
  setAllRoutes (state, routes) {
    state.routes = constantRoutes.concat(routes)
  },
  setPartialRoutes (state, routes) {
    state.partialRoutes = constantRoutes.concat(routes)
  }
}
const actions = {
  /**
   * 设置路由(设置某个路由)
   */
  async setRoutes ({ commit }, permissions) {
    // 开源版只过滤动态路由permissions，admin不再默认拥有全部权限
    const finallyAsyncRoutes = await filterAsyncRoutes([...asyncRoutes], permissions)
    commit('setRoutes', finallyAsyncRoutes)
    return finallyAsyncRoutes
  },
  /**
   * 设置所有路由
   */
  async setAllRoutes ({ commit }) {
    const { data } = await getRouterList()
    // data.push({ path: '*', redirect: '/404', hidden: true });
    const accessRoutes = convertRouter(data)
    commit('setAllRoutes', accessRoutes)
    return accessRoutes
  },
  /**
   * 设置部分路由
   */
  setPartialRoutes ({ commit }, accessRoutes) {
    commit('setPartialRoutes', accessRoutes)
    return accessRoutes
  }
}
export default { state, getters, mutations, actions }
