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
   * 设置路由(这里是设置前端自己配置的异步路由)
   */
  async setRoutes ({ commit }, permissions) {
    const finallyAsyncRoutes = await filterAsyncRoutes([...asyncRoutes], permissions)
    commit('setRoutes', finallyAsyncRoutes)
    return finallyAsyncRoutes
  },
  /**
   * 设置所有路由(这里是设置后端给的异步路由,不会设置前端自己配置的异步路由)
   */
  async setAllRoutes ({ commit }) {
    const { data } = await getRouterList()
    console.log('data', data)
    // data.push({ path: '*', redirect: '/404', hidden: true });
    const accessRoutes = convertRouter(data)
    console.log('accessRoutes', accessRoutes)
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
