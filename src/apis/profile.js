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
export function editUserInfo(options) {
  return request.put('/user/edit',options)
}
export function healthReport() {
  return request.get('/user/health')
}

export function getWeStep(options){
  return request.post('/user/step',options)
}
