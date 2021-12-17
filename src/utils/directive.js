import userInfo from '@/store/modules/user.js'
import controlShowObj from '@/config/control.show.js'

export default (app) => {
  /**
   * 权限控制元素显示或隐藏
   */
  app.directive('control', (el, { value }) => {
    const userPermissions = userInfo.state.permissions // 当前用户权限(每个用户只能有一个对应的权限)
    const showArr = controlShowObj[value]

    if (!userPermissions || !userPermissions[0] || !showArr) {
      throw new Error('请检查当前用户权限是否拥有和权限配置表是否对应的配置正常')
    }

    if (!showArr.includes(userPermissions[0])) {
      el.parentNode.removeChild(el) // 清楚当前元素
    }
  })
}
