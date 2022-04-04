import { defineStore } from 'pinia'

const useAuth = defineStore({
  id: 'authInfo',
  state: () => ({
    userInfo: {
      nickName: '',
      avatarUrl: ''
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
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    }
  }
})
export { useAuth }

