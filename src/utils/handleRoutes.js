import { asyncRoutes } from '@/router'

/**
 * 处理后端路由数据(洗一遍数据,可以根据后端返回的再做额外处理)
 *
 * 注意: 这里是要求在 asyncRoutes 中也要提前定义那些远程路由,如果不想这样做可以更改代码换种实现方式 !!!!!!!!!!!!!!
 * 为什么要提前定义? 因为 component 无法在后台或者mock数据中定义好,所以需要在这边转换一下
 *
 * route 路由数据
 * list 前端路由(asyncRoutes配置项)
 */
const setRoutes = (route, list) => {
  list.forEach((item) => {
    if (item.path === route.path) {
      route.component = item.component
      route.meta = item.meta
      route.name = item.name
      if (route.children && route.children.length) {
        const children = []
        route.children.forEach((option) => {
          children.push(setRoutes(option, item.children))
        })
        route.children = children
      }
    }
  })
  return route
}

function hasPermission (permissions, route) {
  if (route.meta && route.meta.permissions) {
    return permissions.some((role) => route.meta.permissions.includes(role))
  } else {
    return true
  }
}

/**
 * 转换路由
 */
export function convertRouter (routers) {
  return routers.map((route) => setRoutes(route, asyncRoutes))
}

/**
 * 根据权限过滤路由
 */
export function filterAsyncRoutes (routes, permissions) {
  const finallyRoutes = []
  routes.forEach((route) => {
    const item = { ...route }
    if (hasPermission(permissions, item)) {
      if (item.children) {
        item.children = filterAsyncRoutes(item.children, permissions)
      }
      finallyRoutes.push(item)
    }
  })
  return finallyRoutes
}
