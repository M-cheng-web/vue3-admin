import { createStore } from 'vuex'
import getters from './getters.js'

const modulesFiles = import.meta.globEager('./modules/*.js')

// const modules = {}
// for (const path in modulesFiles) {
//   const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
//   modules[moduleName] = { ...modulesFiles[path].default, namespaced: true }
// }

const modules = Object.keys(modulesFiles).reduce((pre, key) => {
  const moduleName = key.replace(/(.*\/)*([^.]+).*/gi, '$2')
  pre[moduleName] = { ...modulesFiles[key].default, namespaced: true }
  return pre
}, {})

// eslint-disable-next-line new-cap
const store = new createStore({
  modules,
  getters
})

export default store
