import HttpRequest from './http'
const baseUrl = process.env.NODE_ENV === 'development' ? 
'http://kx-light.vaiwan.cn/health' : './'

const request = new HttpRequest(baseUrl)

export default request
