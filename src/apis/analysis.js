import request from '~@/utils/request.js'

export function getAnalysis( type) {
  return request.get(`/info/${type}`)
}
export function getWeightList() {
  return request.get('/info/weights')
}


