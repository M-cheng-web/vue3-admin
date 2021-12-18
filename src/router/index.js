import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layouts/index.vue'
import i18n from '@/locales'
const { global } = i18n

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    },
    hidden: true
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/errorPage/401.vue'),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/errorPage/404.vue'),
    hidden: true
  }
]
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: global.t('route.home'),
          icon: 'home',
          affix: true,
          noKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/comp',
    component: Layout,
    name: 'Comp',
    meta: { title: '权限菜单分类Demo', icon: 'home' },
    children: [
      {
        path: '/admin',
        name: 'admin',
        component: () => import('@/views/demo-admin/index.vue'),
        meta: {
          title: '管理员',
          icon: 'home'
        }
      },
      {
        path: '/editor',
        name: 'editor',
        component: () => import('@/views/demo-editor/index.vue'),
        meta: {
          title: '可编辑人员',
          icon: 'home'
        }
      },
      {
        path: '/visitor',
        name: 'visitor',
        component: () => import('@/views/demo-visitor/index.vue'),
        meta: {
          title: '游客',
          icon: 'home'
        }
      }
    ]
  },
  // {
  //   path: '/comp',
  //   component: Layout,
  //   name: 'Comp',
  //   meta: { title: global.t('route.components'), icon: 'code' },
  //   children: [
  //     {
  //       path: '/element',
  //       name: 'ElementComp',
  //       component: () => import('@/views/element/index.vue'),
  //       meta: {
  //         title: global.t('route.eleComponents'),
  //         icon: 'code',
  //       },
  //     },
  //     {
  //       path: '/iconPark',
  //       name: 'IconPark',
  //       component: () => import('@/views/icon/index.vue'),
  //       meta: {
  //         title: global.t('route.icons'),
  //         icon: 'like',
  //       },
  //     },
  //     {
  //       path: '/chart',
  //       name: 'Chart',
  //       component: () => import('@/views/echarts/index.vue'),
  //       meta: {
  //         title: global.t('route.charts'),
  //         icon: 'chart-line',
  //       },
  //       children: [
  //         {
  //           path: '/line',
  //           name: 'Line',
  //           component: () => import('@/views/echarts/line.vue'),
  //           meta: {
  //             title: global.t('route.lineChart'),
  //           },
  //         },
  //         {
  //           path: '/bar',
  //           name: 'Bar',
  //           component: () => import('@/views/echarts/bar.vue'),
  //           meta: {
  //             title: global.t('route.barChart'),
  //           },
  //         },
  //         {
  //           path: '/otherChart',
  //           name: 'OtherChart',
  //           component: () => import('@/views/echarts/other.vue'),
  //           meta: {
  //             title: global.t('route.mixedChart'),
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    path: '/errorPage',
    name: 'ErrorPage',
    component: Layout,
    meta: {
      title: global.t('route.errorPages'),
      icon: 'link-cloud-faild'
    },
    children: [
      {
        path: '/404Page',
        name: '404Page',
        component: () => import('@/views/errorPage/404.vue'),
        meta: {
          title: global.t('route.page404'),
          icon: 'link-cloud-faild'
        }
      },
      {
        path: '/401Page',
        name: '401Page',
        component: () => import('@/views/errorPage/401.vue'),
        meta: {
          title: global.t('route.page401'),
          icon: 'link-interrupt'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
    hidden: true
  }
]

const router = createRouter({
  history: createWebHashHistory(), // 设置为 hash模式
  routes: constantRoutes
})

// 重置路由
// 这里有问题,暂时不要用
export function resetRouter () {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export default router
