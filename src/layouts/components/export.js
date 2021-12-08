const modulesFiles = import.meta.globEager('./*/*.vue')

export default (app) => {
  Object.keys(modulesFiles).forEach((path) => {
    app.component(modulesFiles[path].default.name, modulesFiles[path].default)
  })
}
