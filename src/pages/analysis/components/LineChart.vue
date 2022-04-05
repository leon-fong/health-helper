<template>
  <view class="chart">
    <e-chart ref="chartRef" canvas-id="bar-canvas" />
  </view>
</template>

<script setup>
import { ref } from 'vue'
import Taro from '@tarojs/taro'
import { EChart } from 'echarts4taro3'
let option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
    },
  ],
}
const chartRef = ref()

Taro.nextTick(() => {
  console.log('[ chartRef ] >', chartRef.value)

  setTimeout(() => {
    chartRef.value.refresh(option) // 初始化图表
    // setInterval(() => {
    //   let firstValue = option.series[0].data.shift()
    //   option.series[0].data.push(firstValue)
    //   chartRef.value.setOption(option) // 异步更新图表数据
    // }, 2000)
  }, 200)
})
</script>

<style lang="scss">
.chart {
  width: 100%;
  height: 100%;
}
</style>
