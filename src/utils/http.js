// 封装axios的请求，返回重新封装的数据格式
// 对错误的统一处理
import {computed} from 'vue'
import Taro from '@tarojs/taro'
import axios from 'axios-miniprogram'
// import { useStore } from '~@/store'

// const auth = computed(() => {
//   return useStore('auth')
// })
const CancelToken = axios.CancelToken

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.pending = {}
  }

  // 获取axios配置
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return config
  }

  removePending(key, isRequest = false) {
    if (this.pending[key] && isRequest) {
      this.pending[key]('取消重复请求')
    }
    delete this.pending[key]
  }

  // 设定拦截器
  interceptors(instance) {
    instance.interceptors.request.use(
      config => {
        
        const token = Taro.getStorageSync('token')
        if (token) {
          config.headers.token =  token
        }
        const key = config.url + '&' + config.method
        this.removePending(key, true)
        config.cancelToken = new CancelToken(c => {
          this.pending[key] = c
        })
        return config
      },
      err => {
        
        return Promise.reject(err)
      }
    )

    // 响应请求的拦截器
    instance.interceptors.response.use(
      res => {
        const key = res.config.url + '&' + res.config.method
        this.removePending(key)
        
        if (res.status === 200) {
          return Promise.resolve(res.data)
        }
        else {
          return Promise.reject(res)
        }
      },
      err => {
        
        return Promise.reject(err)
      }
    )
  }

  // 创建实例
  request(options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(newOptions)
  }

  get(url, config) {
    const options = Object.assign(
      {
        method: 'get',
        url: url
      },
      config
    )
    return this.request(options)
  }

  post(url, data){
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }

  put(url, data){
    return this.request({
      method: 'put',
      url: url,
      data 
    })
  }
  delete(url, data){
    return this.request({
      method: 'delete',
      url: url,
      data 
    })
  }
}

export default HttpRequest

