<script setup>
import Taro, { useDidShow } from '@tarojs/taro'
import { getWeStep } from '~@/apis/profile.js'
import { computed, ref, watchEffect } from 'vue'
import { useStore } from '~@/store'
const auth = useStore('auth')
const enableWeStep = computed(() => auth.enableWeStep)
const step = ref(0)

const getStep = () => {
  return new Promise((resolve, reject) => {
    wx.getWeRunData({
      success(res) {
        const encryptedData = res.encryptedData
        const iv = res.iv
        getWeStep({ encryptedData, iv }).then((res) => {
          step.value = res.data.stepInfoList[res.data.stepInfoList.length - 1].step
        })
      },
      complete() {
        resolve()
      },
    })
  })
}

const handlePreView = () => {
  getStep().then(() => {
    auth.startWeStep()
  })
}
// useDidShow(() => {
//   if (enableWeStep.value) {
//     getStep()
//   }
// })
</script>

<template>
  <div class="box step">
    <template v-if="enableWeStep">
      <div class="title">今日步数</div>
      <div class="core">{{ step }}</div>
      <div class="unit">步</div>
    </template>
    <template v-else>
      <div class="preview" @click="handlePreView">查看步数</div>
    </template>
  </div>
</template>

<style lang="scss">
.step {
  flex: 1;
  margin: 0;
  .preview {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #3cbc6e;
  }
  .title {
    text-align: left;
    font-size: 14px;
    color: #333;
  }
  .core {
    text-align: center;
    font-size: 30px;
    color: #3cbc6e;
    font-weight: bold;
    margin: 5px 0;
  }
  .unit {
    text-align: right;
    font-size: 14px;
    color: #999;
  }
}
</style>
