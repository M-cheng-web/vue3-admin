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
