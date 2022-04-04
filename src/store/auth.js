import { defineStore } from 'pinia'
import { getUserInfo} from '~@/apis/profile.js';


const useAuth = defineStore({
  id: 'authInfo',
  state: () => ({
    userInfo: {
  
    },
    isLogin: false
  }),
  actions: {
    login() {
      this.isLogin = true
    },
    logout() {
      this.isLogin = false
    },
   async setUserInfo() {
     const res = await getUserInfo()
     if(res.code === 0){
       this.userInfo = res.data
       
     }else{
       console.log('[ err ] >',res.msg )
     }
     
    }
  }
})
export { useAuth }

