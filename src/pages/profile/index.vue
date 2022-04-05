<template>
  <div class="profile">
    <user-info @edit="handleEdit" />

    <div class="menu" @click="toReport">
      <div class="title">我的身材怎么样？</div>
      <nut-icon name="right"></nut-icon>
    </div>
    <div class="menu" @click="toEatSuggestion">
      <div class="title">我该怎么吃？</div>
      <nut-icon name="right"></nut-icon>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '~@/store'
import Taro, { useDidShow } from '@tarojs/taro'
import { healthReport } from '~@/apis/profile.js'

import UserInfo from './components/UserInfo'

const auth = useStore('auth')

useDidShow(() => {
  auth.login()
  auth.setUserInfo()
  healthReport()
})
const isLogin = computed(() => auth.isLogin)

const handleEdit = () => {
  Taro.navigateTo({
    url: '/pages/profile/edit',
  })
}

const toEatSuggestion = () => {
  Taro.navigateTo({
    url: '/pages/profile/eat-suggestion',
  })
}
const toReport = () => {
  Taro.navigateTo({
    url: '/pages/profile/report',
  })
}
</script>

<style lang="scss">
.profile {
  padding: 20px;
  .menu {
    background-color: #fff;
    margin: 10px 0;
    padding: 12px 18px;
    border-radius: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      color: #555;
    }
  }
}
</style>
