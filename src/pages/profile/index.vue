<template>
  <div class="profile">
    <div class="header">
      <user-info class="info" @edit="handleEdit" />
    </div>
    <nut-cell-group class="box cell">
      <nut-cell icon="fabulous" title="推荐食谱" @click="toRecommend" is-link></nut-cell>
      <nut-cell icon="order" title="食物对比" @click="toCompare" is-link></nut-cell>
      <nut-cell icon="s-follow" title="健康报告" @click="toReport" is-link></nut-cell>
      <nut-cell icon="my2" title="健康分析" @click="toAnalysis" is-link></nut-cell>
    </nut-cell-group>
  </div>
</template>

<script setup>
import Taro from '@tarojs/taro'

import UserInfo from './components/UserInfo.vue'

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
const toRecommend = () => {
  Taro.navigateTo({
    url: '/pages/profile/recommend',
  })
}
const toAnalysis = () => {
  Taro.navigateTo({
    url: '../../module/pages/analysis/index',
  })
}
const toCompare = () => {
  Taro.navigateTo({
    url: '/pages/record/foodCompare',
  })
}
</script>

<style lang="scss">
.profile {
  height: 100vh;
  width: 100%;
  // padding: 0 20px;
  .header {
    position: relative;
    height: 150px;
    background-color: $primary-color;
    .info {
      position: absolute;
      top: 50px;
      padding: 0 20px;

      width: 100%;
      box-sizing: border-box;
      z-index: 9;
    }
  }
  .cell {
    margin: 20px;
    margin-top: 60px;
    padding: 0;
    .nut-cell__title {
      margin-left: 6px;
    }
  }
}
</style>
