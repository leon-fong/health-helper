<script setup>
import dayjs from 'dayjs'
import Taro, { useDidShow } from '@tarojs/taro'
import { getDietByDate, getFoodConsume } from '~@/apis/record.js'
import { baseUrl } from '~@/config/index'
import { ref } from 'vue'

const eatList = [
  {
    label: '早餐',
    value: 'breakfast',
  },
  {
    label: '午餐',
    value: 'lunch',
  },
  {
    label: '晚餐',
    value: 'dinner',
  },
]

const consume = ref(0)

const show = ref(false)
const minDate = new Date(2020, 0, 1)
const maxDate = new Date(2025, 10, 1)
const today = new Date()
const currentDate = ref(dayjs(today).format('YYYY-MM-DD'))
const foodList = ref([])

const init = () => {
  getDietByDate(currentDate.value).then((res) => {
    if (res.code === 0) {
      foodList.value = res.data

      // TODO 使用 pinia 中的推荐热量
      getFoodConsume(1313).then((res) => {
        if (res.code === 0) {
          consume.value = res.data.finishedToday
        }
      })
    }
  })
}

useDidShow(() => {
  init()
})

const confirm = ({ selectedValue, selectedOptions }) => {
  const value = selectedOptions.map((option) => option.text).join('-')
  currentDate.value = value
  init()
}

const handleClick = (type) => {
  Taro.navigateTo({
    url: '/pages/record/foodList?type=' + type,
  })
}
</script>

<template>
  <div class="food-record">
    <div class="menu">
      <div class="top box" @click="show = true">
        {{ currentDate }}
      </div>
      <div class="top box" @click="show = true">共 {{ consume }} 千卡</div>
    </div>
    <div v-for="item in eatList" :key="item.value" class="content box">
      <div class="top" @click="handleClick(item.value)">
        <div class="title">{{ item.label }}</div>
        <nut-icon name="plus"></nut-icon>
      </div>
      <div class="history">
        <div class="food-item" v-for="food in foodList[item.value]">
          <div class="left">
            <nut-avatar size="normal" style="vertical-align: middle" :icon="baseUrl + '/' + food.image"></nut-avatar>
            <span class="ellipsis title" style="margin-left: 10px">{{ food.foodName }}</span>
          </div>
          <div class="right">
            <span style="color: #f00">{{ food.caloriesBurned }}</span>
            <span style="opacity: 0.5; font-size: 12px"> 千卡</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <nut-datepicker v-model="today" v-model:visible="show" :min-date="minDate" :max-date="maxDate" @confirm="confirm"></nut-datepicker>
</template>

<style lang="scss">
.food-record {
  padding: 0 20px;
  height: 100vh;
  .menu {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    .top {
      flex: 1;
      margin-top: 20px;
    }
  }
  .content {
    .top {
      display: flex;
      justify-content: space-between;
      .title {
        font-weight: bold;
        font-size: 17px;
      }
    }
    .history {
      .food-item {
        margin-top: 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
          color: #555;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
