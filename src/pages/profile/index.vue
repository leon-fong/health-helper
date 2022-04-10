<template>
  <div class="profile">
    <user-info @edit="handleEdit" />
    <div class="middle">
      <we-step />
      <eat-suggestion />
    </div>

    <div class="menu" @click="toReport">
      <div class="title">健康报告</div>
      <nut-icon name="right"></nut-icon>
    </div>
    <div class="menu" @click="toAnalysis">
      <div class="title">健康分析</div>
      <nut-icon name="right"></nut-icon>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '~@/store'
import Taro, { useDidShow } from '@tarojs/taro'

import UserInfo from './components/UserInfo.vue'
import WeStep from './components/WeStep.vue'
import EatSuggestion from './components/EatSuggestion.vue'
const auth = useStore('auth')

// useDidShow(() => {
//   auth.login()
//   auth.setUserInfo()
//   // healthReport()
// })
const handleEdit = () => {
  Taro.navigateTo({
    url: '/pages/profile/edit',
  })
}
const toReport = () => {
  Taro.navigateTo({
    url: '/pages/profile/report',
  })
}
const toAnalysis = () => {
  Taro.navigateTo({
    url: '/pages/analysis/index',
  })
}
</script>

<style lang="scss">
.profile {
  padding: 0 20px;
  .middle {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  .menu {
    background-color: #fff;
    margin: 20px 0;
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
