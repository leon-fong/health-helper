<script setup>
import { getWeStep } from '~@/apis/profile.js'
import { ref, computed, watchEffect } from 'vue'
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const show = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  },
})

const step = ref(0)
watchEffect(() => {
  if (show.value) {
    wx.getWeRunData({
      success(res) {
        const encryptedData = res.encryptedData
        const iv = res.iv
        getWeStep({ encryptedData, iv }).then((res) => {
          step.value = res.data.stepInfoList[res.data.stepInfoList.length - 1].step
        })
      },
    })
  }
})
</script>

<template>
  <nut-popup pop-class="step" :style="{ padding: '15px', borderRadius: '13px' }" v-model:visible="show" :z-index="100" @close="show = false">
    <div class="title">今日步数</div>
    <div class="core">{{ step }} <span class="unit">步</span></div>
  </nut-popup>
</template>

<style lang="scss">
.step {
  width: 200px;
  height: 200px;
  .title {
    text-align: left;
    font-size: 20px;
    color: #333;
  }
  .core {
    text-align: center;
    font-size: 60px;
    color: #3cbc6e;
    font-weight: bold;
    margin: 50px 0;
  }
  .unit {
    text-align: right;
    font-size: 20px;
    color: #999;
  }
}
</style>
