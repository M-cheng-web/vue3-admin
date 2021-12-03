/**
 * @description 主题配置
 */

// menuBgColor: 菜单背景色,  primary: 主题色
const themeOptions = {
  theme1: { menuBgColor: '#ffffff', primary: '#7e9cff' },
  theme2: { menuBgColor: '#293246', primary: '#7e9cff' },
  theme3: { menuBgColor: '#ffffff', primary: '#08a17e' },
  theme4: { menuBgColor: '#293246', primary: '#08a17e' },
  theme5: { menuBgColor: '#ffffff', primary: '#f45555' },
  theme6: { menuBgColor: '#293246', primary: '#f45555' }
}
export const themeConfig = {
  mode: 'vertical', // 模式 horizontal(菜单在上方) / vertical(菜单在左侧)

  // 主题 默认配置theme1
  // 注意⚠️ ：修改默认主题时，记得同步修改 element-variables.scss
  // 文件中的 $base-color-primary 默认值，否则不生效！！！
  theme: 'theme2',

  themeOptions, // 主题配置

  fixedHead: true, // 是否固定头部

  fullScreen: true, // 是否显示全屏

  refresh: true, // 是否显示刷新

  notice: true, // 是否显示通知

  isBreadcrumb: true, // 是否显示面包导航

  isLogo: true, // 是否显示logo

  tag: true, // 是否显示标签

  collapse: false // 是否展开菜单
}
