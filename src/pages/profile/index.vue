<template>
  <main v-if="isLogin" class="my-container">
    <user-info />
    <nut-button @click='handleInfo'>click</nut-button>
  </main>
  <main v-else>
    <div class="welcome">
      <div class="top">
        <text class="h1">欢迎使用 健康助手</text>
        <text class="span">健康生活，与你同行</text>
      </div>
      <div class="middle">
        <img src="https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg" alt="" />
      </div>
      <nut-button block  color="linear-gradient(to right, #6bdf83, #4dbc76)" @click="handleLogin">微信一键登录</nut-button>
    </div>
  </main>
  <nut-toast :msg="msg" v-model:visible="isShowTips"  />
</template>

<script setup>
import Taro from '@tarojs/taro'
import { computed,ref } from 'vue'
// import { Toast } from '@nutui/nutui-taro'
import { useStore } from '~@/store'
import { getToken } from '~@/apis/profile.js';

import UserInfo from './components/UserInfo'


    
const auth = useStore('auth')

const isShowTips = ref(false)

const code = ref('')

const msg = ref('')

const isLogin = computed(() => auth.isLogin)


  const handleLogin= async()=>{

    const res = await Taro.getUserProfile({desc:login()})
 const { rawData, signature } = res
               const data = await getToken(code.value,rawData,signature)
               if(data.code === 0){
                    Taro.setStorageSync('token', data.data)
                  auth.setUserInfo()
                   auth.login()
                  
               }else{
                  msg.value = data.msg
                  isShowTips.value = true
                  return
               }
    

  }

  const login = ()=>{

    Taro.login().then((res)=>{
      if(res.code){
        code.value = res.code
      }
    })

    return '用于完善会员资料';

  }

//  const handleLogin = (e) => {
    
//          const p1 = new
                
            
            //       wx.getUserProfile({
            //     desc: 'desc',
            //     success: async(response) => {
            //       const { rawData, signature } = response
            //    const data = await getToken(res.code,rawData,signature)
            //    if(data.code === 0){
            //         Taro.setStorageSync('token', data.data)
            //       auth.setUserInfo()
            //        auth.login()
                  
            //    }else{
            //       msg.value = data.msg
            //       isShowTips.value = true
            //       return
            //    }
                 
            //   }
            // }),
          
    
        
      
//     }


</script>

<style lang="scss">
.welcome {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  padding: 40px;
  .top {
    align-self: flex-start;
    .h1 {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      display: block;
    }
    .span {
      font-size: 14px;
      color: #666;
    }
  }
}
</style>
