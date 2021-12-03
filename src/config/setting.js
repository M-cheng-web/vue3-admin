/**
 * @description 公共配置文件
 * vite相关的配置文件参考 https://cn.vitejs.dev/config/#define
 */

export const setting = {
  base: './', // 项目部署的基础路径

  publicDir: 'public', // 静态资源服务的文件夹 类型 string | false

  cacheDir: 'node_modules/.vite', // 存储缓存文件的目录

  outDir: 'dist', // 输出路径

  assetsDir: 'static/', // 生成静态资源的存放路径

  sourcemap: false, // 构建后是否生成 source map 文件

  chunkSizeWarningLimit: 2000, // chunk 大小警告的限制

  cssCodeSplit: true, // 启用/禁用 CSS 代码拆分(压缩大型输出文件可能会很慢,因此禁用该功能可能会提高大型项目的构建性能)

  brotliSize: false, // 启用/禁用 brotli 压缩大小报告

  host: '0.0.0.0', // 指定服务器应该监听哪个 IP 地址

  port: '3000', // 指定开发服务器端口

  strictPort: false, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口

  open: true, // 服务器启动时自动在浏览器中打开应用程序 此值为字符串时，会被用作 URL 的路径名

  progressBar: true, // 是否显示顶部进度条

  defaultOpeneds: ['/comp', '/errorPage', '/chart'], // 菜单栏默认打开路由

  uniqueOpened: false, // vertical布局时是否只保持一个子菜单的展开

  tokenName: 'accessToken', // token名称

  loginInterception: true, // 是否开启登录拦截

  tokenTableName: 'vue3-admin-template', // token在localStorage、sessionStorage存储的key的名称

  langKey: 'i18nLang', // lang storage

  themeKey: 'theme', // theme storage

  lang: 'zh-cn', // default language

  storage: 'localStorage', // token存储位置localStorage sessionStorage

  title: 'vue3-admin-template', // 标题

  copyright: '© hu-snail-2021 vue3-admin-element-template', // 版权信息

  footerCopyright: true, // 是否显示页面底部自定义版权信息

  keepAliveMaxNum: 99, // 缓存路由的最大数量

  authentication: 'intelligence', // intelligence 前端控制路由  / all 后端控制

  recordRoute: true, // token失效回退到登录页时是否记录本次的路由

  routesWhiteList: ['/login', '/register', '/404', '/401'], // 路由白名单不经过token校验的路由

  debounce: [], // 需要加loading层的请求，防止重复提交

  extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'], // 导入时想要省略的扩展名列表

  logLevel: 'info', // 调整控制台输出的级别 'info' | 'warn' | 'error' | 'silent'

  clearScreen: false, // 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息

  drop_console: true, // 是否删除生产环境console

  drop_debugger: true // 是否删除生产环境debugger
}
