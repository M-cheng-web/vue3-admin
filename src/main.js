import { createApp } from 'vue'
import App from './App.vue'

import 'element-plus/theme-chalk/display.css'

// ------------------- permission 权限文件 -------------------
import './config/permission'

// ------------------- 路由 -------------------
import router from './router/index'

// ------------------- vuex -------------------
import store from './store'

// ------------------- 注册字节跳动图标 -------------------
import iconPark from './plugin/icon-park'

// ------------------- 国际化 -------------------
import loadI18n from './plugin/i18n'

// ------------------- layout的一些组件全局注册 -------------------
import layoutComp from './layouts/components/export'

// ------------------- 自定义指令 -------------------
import directiveInstall from './utils/directive'

// ------------------- 埋点,性能监控 -------------------
import webtracing from '@web-tracing/vue'

const app = createApp(App)
app.use(webtracing, {
  requestUrl: 'http://8.129.19.55:8081/sys-file/test-receive',
  appName: 'chengxh',
  event: true
})
app.use(store)
app.use(router)
layoutComp(app)
iconPark(app)
loadI18n(app)
directiveInstall(app)

app.mount('#app')
