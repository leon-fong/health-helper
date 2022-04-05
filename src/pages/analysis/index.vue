<template>
  <view class="record">
    <nut-tabs v-model="selected">
      <nut-tabpane v-for="item in type" :title="item.label">
        <template #default>
          <line-chart />
        </template>
      </nut-tabpane>
    </nut-tabs>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import LineChart from './components/LineChart'
import { getAnalysis } from '~@/apis/analysis.js'
const selected = ref(0)
const type = [
  {
    label: '血糖',
    value: 'bloodSugar',
  },
  {
    label: '高血压',
    value: 'highBloodPressure',
  },
  {
    label: '低血压',
    value: 'lowBloodPressure',
  },
  {
    label: '体重',
    value: 'weight',
  },
]
getAnalysis()
</script>

<style lang="scss">
.record {
  width: 100%;
  height: 100vh;
  .nut-tabpane {
    padding: 0;
    height: calc(100vh - 22px);
  }
}
</style>
