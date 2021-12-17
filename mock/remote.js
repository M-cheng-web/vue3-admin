// 动态组件mock
// 目的是让后端传给前端组件,然后前端去渲染

// import publicKey from './remoteCom'

export default [
  {
    url: '/api/getPop',
    type: 'post',
    response () {
      return {
        code: 200,
        msg: 'success',
        data: {
          mockServer: true,
          publicKey: 0
        }
      }
    }
  }
]
