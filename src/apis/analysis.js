import request from '~@/utils/request.js'

export function getAnalysis( ) {
  return request.get('/info')
}


