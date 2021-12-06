const modulesFiles = import.meta.globEager('./*/*.vue')

export default (app) => {
  Object.keys(modulesFiles).forEach((path) => {
    console.log('modulesFiles[path].default.name', modulesFiles[path].default.name)
    app.component(modulesFiles[path].default.name, modulesFiles[path].default)
  })
}
