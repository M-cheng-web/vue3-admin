/**
 * @description 配置axios请求基础信息
 */

export const netConfig = {
  // axios 基础url地址(这里注意端口:3000变化了会有问题,mock失败了多半是因为端口对不上)
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : '/api',

  cors: true, // 为开发服务器配置 CORS 默认启用并允许任何源,传递一个 选项对象 来调整行为或设为 false 表示禁用

  contentType: 'application/json;charset=UTF-8', // 根据后端定义配置

  messageDuration: 3000, // 消息框消失时间

  requestTimeout: 10000, // 最长请求时间

  successCode: [200, 0], // 操作正常code,支持String、Array、int多种类型

  invalidCode: -1, // 登录失效code

  noPermissionCode: -1 // 无权限code
}
