<template>
  <div class="record">
    <div class="header">
      <div class="box recommend" @click="isShowRecommend = true">
        <span class="title">推荐食谱</span>
      </div>
      <div class="box recommend" style="margin-left: 20px" @click="toCompare">
        <span class="title">食物对比</span>
      </div>
    </div>
    <div class="middle">
      <div v-for="item in daylily" :key="item.label">
        <div class="box daylily">
          <i :class="['iconfont', item.icon]"></i>
          <span class="value">{{ item.value }}</span>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="box" @click="toFoodRecord">
        <div class="top">
          <div class="title">饮食摄入</div>
        </div>
        <div class="value">
          <div class=""></div>
        </div>
      </div>
      <div class="box">
        <div class="top">
          <div class="title">运动消耗</div>
        </div>
        <div class="bottom">
          <div class="value"></div>
        </div>
      </div>
    </div>
  </div>
  <Recommend :show="isShowRecommend" @close="isShowRecommend = false" />
</template>

<script setup>
import { ref } from 'vue'
import Taro from '@tarojs/taro'
import Recommend from './components/Recommend.vue'

const daylily = [
  {
    label: 'weight',
    value: '体重',
    icon: 'icon-S_feipanglijigaishan',
  },
  {
    label: 'highBloodPressure',
    value: '高压',
    icon: 'icon-S_kexuekongyashouye',
  },
  {
    label: 'lowBloodPressure',
    value: '低压',
    icon: 'icon-S_kexuekongyashouye',
  },
  {
    label: 'bloodSugar',
    value: '血糖',
    icon: 'icon-S_kongtang',
  },
]

const isShowRecommend = ref(false)

const toFoodRecord = () => {
  Taro.navigateTo({
    url: '/pages/record/foodRecord',
  })
}

const toCompare = () => {
  Taro.navigateTo({
    url: '/pages/record/foodCompare',
  })
}
</script>

<style lang="scss">
.record {
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    .recommend {
      width: 100%;
      padding: 30px auto;
      text-align: center;
    }
  }
  .middle {
    display: flex;
    justify-content: space-between;
    .daylily {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      i {
        font-size: 30px;
      }
      .value {
        font-size: 12px;
        color: #666;
        margin-top: 4px;
      }
    }
  }
}
</style>
