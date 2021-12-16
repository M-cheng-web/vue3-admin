import request from '@/utils/request.js'

export const getPop = async () => {
  return request({
    url: '/getPop',
    method: 'get'
  })
}
