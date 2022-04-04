import { createPinia } from 'pinia'
import { useAuth } from './auth'

export const store = createPinia()

const storeObj = {
  auth: useAuth
}

// 封装成useStore的形式，这样一看引用就知道是store的数据
export function useStore(key) {
  return storeObj[key]()
}

