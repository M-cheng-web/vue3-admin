import { createStore } from 'vuex'
import getters from './getters.js'

// vite特有的引入方式
// const modulesFiles = import.meta.globEager('./modules/*.js');

const modules = {}
// for (const path in modulesFiles) {
//   const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2');
//   modules[moduleName] = modulesFiles[path].default;
// }

// Object.keys(modules).forEach((key) => {
//   modules[key]['namespaced'] = true;
// });

// eslint-disable-next-line new-cap
const store = new createStore({
  modules,
  getters
})

export default store
