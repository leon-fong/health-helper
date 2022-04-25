<template>
  <nut-tabs v-model="selected" @change="tabChange">
    <nut-tabpane v-for="(value, key) in type" :key="key" :paneKey="key" :title="value"> </nut-tabpane>
  </nut-tabs>
  <view class="record">
    <div class="toggle">
      <nut-button type="primary" size="mini" v-if="selected === 2" @click="toggle">{{ toggleTitle }}</nut-button>
    </div>
    <div style="padding: 20px" v-if="selected === 2 && isShowTable">
      <nut-table :columns="state.columns" :data="state.data"></nut-table>
      <div class="more" @click="getMore">查看更多</div>
    </div>
    <e-chart v-show="!isShowTable || selected !== 2" ref="chartRef" canvas-id="bar-canvas" />
  </view>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import _ from 'lodash'
import dayjs from 'dayjs'
import { getAnalysis, getWeightList } from '~@/apis/analysis.js'
import Taro from '@tarojs/taro'
import { EChart } from 'echarts4taro3'

const state = reactive({
  columns: [
    {
      title: '日期',
      key: 'reportDate',
    },
    {
      title: '体重',
      key: 'weight',
    },
    {
      title: '幅度',
      key: 'gain',
    },
  ],
  data: [],
})

const isShowTable = ref(false)
const toggle = () => {
  isShowTable.value = !isShowTable.value
}

const toggleTitle = computed(() => {
  return isShowTable.value ? '折线图' : '列表'
})

const type = {
  bloodSugar: '血糖',
  bloodPressure: '血压',
  weight: '体重',
}

const option = {
  legend: {
    data: [],
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
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  series: [],
}

const getMore = () => {
  // Todo 查看更多
}

const selected = ref(0)
let date = []
let data = []
function init(key) {
  return new Promise((resolve, reject) => {
    getAnalysis(key).then((res) => {
      if (res.code === 0) {
        date = Object.keys(res.data)
        const list = Object.values(res.data)
        if (key === 'bloodPressure') {
          data = {
            high: [],
            low: [],
          }
          list.map((item) => {
            data.high.push(item.highBloodPressure)
            data.low.push(item.lowBloodPressure)
          })
          option.series = [
            {
              name: '血压(高)',
              type: 'line',
              stack: 'Total',
              data: data.high,
            },
            {
              name: '血压(低)',
              type: 'line',
              stack: 'Total',
              data: data.low,
            },
          ]
          option.legend.data = ['血压(高)', '血压(低)']
        } else {
          data = list
          option.series = [
            {
              name: type[key],
              type: 'line',
              stack: 'Total',
              data: data,
            },
          ]
          option.legend.data = [type[key]]
        }
        option.xAxis.data = date
        chartRef.value.setOption(option)
        resolve()
      }
    })
  })
}
init('bloodSugar')
getWeightList().then((res) => {
  if (res.code === 0) {
    res.data.items.map((item) => {
      item.reportDate = dayjs(item.reportDate).format('YYYY-MM-DD')
    })

    state.data = res.data.items
  }
})

async function tabChange({ paneKey }) {
  const key = Object.keys(type)[paneKey]
  chartRef.value.refresh(option)
  await init(key)
  chartRef.value.setOption(option)

  // Taro.nextTick(() => {
  //   setTimeout(() => {
  //     chartRef.value.refresh(option) // 初始化图表
  //   }, 500)
  // })
}

const chartRef = ref()

Taro.nextTick(() => {
  setTimeout(() => {
    chartRef.value.refresh(option) // 初始化图表
  }, 200)
})
</script>

<style lang="scss">
.record {
  width: 100%;
  height: calc(100vh - 100px);
  .toggle {
    display: flex;
    height: 60rpx;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    padding: 0 10px;
  }
}
.nut-tabpane {
  padding: 0;
}
</style>
