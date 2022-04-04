<template>
  <main v-if="isLogin" class="my-container">
    <user-info />
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
      <nut-button block color="linear-gradient(to right, #6bdf83, #4dbc76)" @click="handleLogin">微信一键登录</nut-button>
    </div>
  </main>
</template>

<script setup>
import Taro from '@tarojs/taro'
import { computed } from 'vue'
import { useStore } from '~@/store'

import UserInfo from './components/UserInfo'

const auth = useStore('auth')

const isLogin = computed(() => auth.isLogin)

const handleLogin = () => {
  setTimeout(() => {
    // 模拟后端请求得到token和userInfo
    Taro.setStorageSync('token', 'xxxx')
    auth.setUserInfo({
      nickName: '林',
      avatarUrl: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
    })
    auth.login()
  }, 500)
}
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
