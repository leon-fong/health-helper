import request from '~@/utils/request.js'

export function getFoodList( page = 1,pageSize = 10) {
  return request.get('/food/list',{data:{
    page,pageSize
  }})
}
export function  recordDiet( options) {
  return request.post('/food/report',options)
}
export function  getDietByDate( currentTime = '') {
  return request.get('/food',{
    data:{
      currentTime
    }
  })
}

