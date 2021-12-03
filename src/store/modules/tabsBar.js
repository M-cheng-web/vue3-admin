/**
 * @description 路由-tabbar
 */

const state = {
  visitedRoutes: [] // tabbar栏展示的路由
}

const getters = {
  visitedRoutes: (state) => state.visitedRoutes
}
const mutations = {
  addVisitedRoute (state, route) {
    const target = state.visitedRoutes.find((item) => item.path === route.path)
    if (target) {
      if (route.fullPath !== target.fullPath) Object.assign(target, route)
      return
    }
    state.visitedRoutes.push(Object.assign({}, route))
  },
  delVisitedRoute (state, route) {
    state.visitedRoutes.forEach((item, index) => {
      if (item.path === route.path) state.visitedRoutes.splice(index, 1)
    })
  },
  delOthersVisitedRoute (state, route) {
    state.visitedRoutes = state.visitedRoutes.filter(
      (item) => item.meta.affix || item.path === route.path
    )
  },
  delLeftVisitedRoute (state, route) {
    let index = state.visitedRoutes.length
    state.visitedRoutes = state.visitedRoutes.filter((item) => {
      if (item.name === route.name) index = state.visitedRoutes.indexOf(item)
      return item.meta.affix || index <= state.visitedRoutes.indexOf(item)
    })
  },
  delRightVisitedRoute (state, route) {
    let index = state.visitedRoutes.length
    state.visitedRoutes = state.visitedRoutes.filter((item) => {
      if (item.name === route.name) index = state.visitedRoutes.indexOf(item)
      return item.meta.affix || index >= state.visitedRoutes.indexOf(item)
    })
  },
  delAllVisitedRoutes (state) {
    state.visitedRoutes = state.visitedRoutes.filter((item) => item.meta.affix)
  },
  updateVisitedRoute (state, route) {
    state.visitedRoutes.forEach((item) => {
      if (item.path === route.path) item = Object.assign(item, route)
    })
  }
}
const actions = {
  /**
   * 添加tabBar
   */
  addVisitedRoute ({ commit }, route) {
    commit('addVisitedRoute', route)
  },
  /**
   * 删除tabBar
   * 返回对象格式
   */
  async delRoute ({ dispatch, state }, route) {
    await dispatch('delVisitedRoute', route)
    return {
      visitedRoutes: [...state.visitedRoutes]
    }
  },
  /**
   * 删除tabBar
   * 返回数组格式
   */
  delVisitedRoute ({ commit, state }, route) {
    commit('delVisitedRoute', route)
    return [...state.visitedRoutes]
  },
  /**
   * 删除其他tabBar
   * 返回对象格式
   */
  async delOthersRoutes ({ dispatch, state }, route) {
    await dispatch('delOthersVisitedRoute', route)
    return {
      visitedRoutes: [...state.visitedRoutes]
    }
  },
  /**
   * 删除左侧tabBar
   */
  async delLeftRoutes ({ dispatch, state }, route) {
    await dispatch('delLeftVisitedRoute', route)
    return {
      visitedRoutes: [...state.visitedRoutes]
    }
  },
  /**
   * 删除右侧tabBar
   */
  async delRightRoutes ({ dispatch, state }, route) {
    await dispatch('delRightVisitedRoute', route)
    return {
      visitedRoutes: [...state.visitedRoutes]
    }
  },
  /**
   * 删除其他tabBar
   * 返回数组格式
   */
  delOthersVisitedRoute ({ commit, state }, route) {
    commit('delOthersVisitedRoute', route)
    return [...state.visitedRoutes]
  },
  /**
   * 删除左侧tabBar
   * 返回数组格式
   */
  delLeftVisitedRoute ({ commit, state }, route) {
    commit('delLeftVisitedRoute', route)
    return [...state.visitedRoutes]
  },
  /**
   * 删除右侧tabBar
   * 返回数组格式
   */
  delRightVisitedRoute ({ commit, state }, route) {
    commit('delRightVisitedRoute', route)
    return [...state.visitedRoutes]
  },
  /**
   * 删除所有tabBar
   * 返回对象格式
   */
  async delAllRoutes ({ dispatch, state }, route) {
    await dispatch('delAllVisitedRoutes', route)
    return {
      visitedRoutes: [...state.visitedRoutes]
    }
  },
  /**
   * 删除所有tabBar
   * 返回数组格式
   */
  delAllVisitedRoutes ({ commit, state }) {
    commit('delAllVisitedRoutes')
    return [...state.visitedRoutes]
  },
  /**
   * 更改目标tabBar
   */
  updateVisitedRoute ({ commit }, route) {
    commit('updateVisitedRoute', route)
  }
}
export default { state, getters, mutations, actions }
