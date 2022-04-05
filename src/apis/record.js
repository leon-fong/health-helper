import request from '~@/utils/request.js'

export function getFoodList( page = 1,pageSize = 10) {
  return request.get('/food/list',{data:{
    page,pageSize
  }})
}
