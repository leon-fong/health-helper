<template>
  <view class="record">
    <e-chart ref="chartRef" canvas-id="bar-canvas" />
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import _ from 'lodash'
import { getAnalysis } from '~@/apis/analysis.js'
import Taro from '@tarojs/taro'
import { EChart } from 'echarts4taro3'
const list = ref({})
getAnalysis().then((res) => {
  if (res.code === 0) {
    list.value = res.data.items
  }
})

const weightArr = ref([])
const bloodSugarArr = ref([])
const highBloodPressureArr = ref([])
const lowBloodPressureArr = ref([])
const dateArr = computed(() => {
  const arr = _.keys(list.value).sort()
  arr.forEach((item) => {
    weightArr.value.push(list.value[item].weight)
    bloodSugarArr.value.push(list.value[item].bloodSugar)
    highBloodPressureArr.value.push(list.value[item].highBlood)
    lowBloodPressureArr.value.push(list.value[item].lowBloodPressure)
  })

  return arr
})

const option = computed(() => {
  return {
    legend: {
      data: ['体重', '血糖', '血压(高)', '血压(低)'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    xAxis: {
      type: 'category',
      data: dateArr.value,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '体重',
        type: 'line',
        stack: 'Total',
        data: weightArr.value,
      },
      {
        name: '血糖',
        type: 'line',
        stack: 'Total',
        data: bloodSugarArr.value,
      },
      {
        name: '血压(高)',
        type: 'line',
        stack: 'Total',
        data: highBloodPressureArr.value,
      },
      {
        name: '血压(低)',
        type: 'line',
        stack: 'Total',
        data: lowBloodPressureArr.value,
      },
    ],
  }
})
const chartRef = ref()

Taro.nextTick(() => {
  // console.log('[ chartRef ] >', chartRef.value)

  setTimeout(() => {
    chartRef.value.refresh(option.value) // 初始化图表
    // setInterval(() => {
    //   let firstValue = option.series[0].data.shift()
    //   option.series[0].data.push(firstValue)
    //   chartRef.value.setOption(option) // 异步更新图表数据
    // }, 2000)
  }, 200)
})
</script>

<style lang="scss">
.record {
  width: 100%;
  height: 100vh;
  padding: 30px 0;
  .nut-tabpane {
    padding: 0;
    height: calc(100vh - 22px);
  }
}
</style>
