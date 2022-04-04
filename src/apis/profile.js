import request from '~@/utils/request.js'

export function getToken( code,rawData,  signature) {
  return request.post('/user/login',{
    code,
    rawData,
    signature
  })
}



export function getUserInfo() {
  return request.get('/user')
}
