import { createApp } from 'vue'
import App from './App.vue'

import 'element-plus/theme-chalk/display.css'

// 路由
import router from './router/index'

// vuex
import store from './store'

// 注册字节跳动图标
import iconPark from './plugin/icon-park'

// 国际化
import loadI18n from './plugin/i18n'

const app = createApp(App)
app.use(store)
app.use(router)
iconPark(app)
loadI18n(app)

app.mount('#app')

// NODE_ENV=development 和 --mode development 有什么差别?
// 初步验证:

// 用 NODE_ENV=uat 会导致的情况
// 1. process.env.NODE_ENV 为 development
// 2. 拿不到其他配置项了(import.meta.env.VITE_APP_WEB_URL 和 process.env.VITE_APP_WEB_URL 都拿不到)

// 用 --mode uat 会导致的情况
// 1. process.env.NODE_ENV 为 uat
// 2. import.meta.env.VITE_APP_WEB_URL 可以拿到配置项

// 但是
// 想用mockjs的话  必须用 NODE_ENV=development 的方式才可以 这是为什么?
