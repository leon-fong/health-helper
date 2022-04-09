
import request from '~@/utils/request.js'

export function getRecommend( ) {
  return request.get('/food/recommend')
}


