import request from '~@/utils/request.js'

export function getAnalysis( type) {
  return request.get(`/info/${type}`)
}


export function getWeightList( page = 1,pageSize = 10) {
  return request.get('/info/weights',{data:{
    page,pageSize
  }})
}

