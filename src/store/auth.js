import { defineStore } from 'pinia'
import { getUserInfo} from '~@/apis/profile.js';
import Taro from '@tarojs/taro'
const useAuth = defineStore({
  id: 'authInfo',
  state: () => ({
    userInfo: {
    },
    isLogin: false,
    enableWeStep: false,
  }),
  actions: {
    startWeStep(){
      this.enableWeStep = true
    },
    login() {
      this.isLogin = true
    },
    logout() {
      this.$reset()
      Taro.reLaunch({
        url: '/pages/profile/index'
      })
    },
   async setUserInfo() {
     const res = await getUserInfo()
     if(res.code === 0){
       this.userInfo = res.data
     }else{
       console.error('[ err ] >',res.msg )
     }
     
    }
  }
})
export { useAuth }

