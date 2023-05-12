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
      <div class="nomore" v-if="noMore">暂无更多数据</div>
    </div>
    <e-chart v-show="!isShowTable || selected !== 2" ref="chartRef" canvas-id="bar-canvas" />
  </view>
</template>

<script setup>
import { computed, ref, reactive, h } from 'vue'
import _ from 'lodash'
import dayjs from 'dayjs'
import { getAnalysis, getWeightList } from '~@/apis/analysis.js'
import Taro, { useReachBottom } from '@tarojs/taro'
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
      render: (record) => {
        return h(
          'span',
          {
            style: {
              color: record.gain > 0 ? '#f00' : '#0f0',
            },
          },
          record.gain
        )
      },
    },
  ],
  data: [],
})

const page = ref(1)
const pageSize = 20
const noMore = ref(false)

const isShowTable = ref(false)
const toggle = () => {
  isShowTable.value = !isShowTable.value
}

const toggleTitle = computed(() => {
  return isShowTable.value ? '折线图' : '列表'
})

const type = {
  bloodPressure: '血压',
  bloodSugar: '血糖',
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
        chartRef.value?.setOption(option)
        resolve()
      }
    })
  })
}

useReachBottom(() => {
  if (page.value * pageSize == state.data.length) {
    page.value = page.value + 1
    createList()
  } else {
    noMore.value = true
  }
})

function createList() {
  getWeightList(page.value, pageSize).then((res) => {
    if (res.code === 0) {
      res.data.items.map((item) => {
        item.reportDate = dayjs(item.reportDate).format('YYYY-MM-DD')
      })

      if (res.data.items.length == pageSize) {
        state.data.push(...res.data.items)
        noMore.value = false
      } else {
        state.data.push(...res.data.items)
        noMore.value = true
      }
    }
  }).catch(err => {
    Taro.showToast({
      icon: 'none',
      title: '出错了，请查看控制台～'
    })
    console.error('出错了：请确保MYSQL版本高于8.0');
  })
}

init('bloodSugar')
createList()

async function tabChange({ paneKey }) {
  const key = Object.keys(type)[paneKey]
  chartRef.value.refresh(option)
  await init(key)
  // chartRef.value.setOption(option)

  // Taro.nextTick(() => {
  setTimeout(() => {
    chartRef.value.refresh(option) // 初始化图表
  }, 500)
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
