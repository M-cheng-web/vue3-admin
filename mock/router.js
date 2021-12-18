const data = [
  {
    path: '/',
    component: 'Layout',
    redirect: 'index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: '',
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
          noKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/comp',
    component: 'Layout',
    name: 'Comp',
    meta: { title: '权限菜单分类Demo', icon: '' },
    children: [
      {
        path: '/admin',
        name: 'admin',
        meta: {
          title: '管理员'
        }
      }
    ]
  }
]

const data2 = [
  {
    path: '/',
    component: 'Layout',
    redirect: 'index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: '',
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
          noKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/comp',
    component: 'Layout',
    name: 'Comp',
    meta: { title: '权限菜单分类Demo', icon: '' },
    children: [
      {
        path: '/editor',
        name: 'editor',
        meta: {
          title: '可编辑人员'
        }
      }
    ]
  }
]

const data3 = [
  {
    path: '/',
    component: 'Layout',
    redirect: 'index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: '',
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
          noKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/comp',
    component: 'Layout',
    name: 'Comp',
    meta: { title: '游客', icon: '' },
    children: [
      {
        path: '/visitor',
        name: 'visitor',
        meta: {
          title: '游客'
        }
      }
    ]
  }
]

export default [
  {
    url: '/api/menu/navigate',
    type: 'post',
    response (config) {
      const { accesstoken } = config.headers
      let permissionsData = data
      switch (accesstoken) {
        case 'admin-accessToken':
          permissionsData = data
          break
        case 'editor-accessToken':
          permissionsData = data2
          break
        case 'visitor-accessToken':
          permissionsData = data3
          break
        default:
          break
      }

      return { code: 200, msg: 'success', data: permissionsData }
    }
  }
]
