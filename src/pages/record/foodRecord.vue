<script setup>
import Taro, { useDidShow } from '@tarojs/taro'
import { getDietByDate } from '~@/apis/record.js'
import { baseUrl } from '~@/config/index'
import dayjs from 'dayjs'
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

const show = ref(false)
const minDate = new Date(2020, 0, 1)
const maxDate = new Date(2025, 10, 1)
const today = new Date()
const currentDate = ref(dayjs(today).format('YYYY-MM-DD'))
const foodList = ref([])

useDidShow(() => {
  getDietByDate(currentDate.value).then((res) => {
    if (res.code === 0) {
      foodList.value = res.data
    }
  })
})

const confirm = ({ selectedValue, selectedOptions }) => {
  const value = selectedOptions.map((option) => option.text).join('-')
  currentDate.value = value

  console.log('[ currentDate ] >', currentDate.value)
}

const handleClick = (type) => {
  Taro.navigateTo({
    url: '/pages/record/foodList?type=' + type,
  })
}
</script>

<template>
  <div class="food-record">
    <div class="top box" @click="show = true">
      {{ currentDate }}
    </div>
    <div v-for="item in eatList" :key="item.value" class="content box" @click="handleClick(item.value)">
      <div class="top">
        <div class="title">{{ item.label }}</div>
        <nut-icon name="plus"></nut-icon>
      </div>
      <div class="history">
        <div class="food-item" v-for="food in foodList[item.value]">
          <div class="left">
            <nut-avatar size="normal" style="vertical-align: middle" :icon="baseUrl + '/' + food.image"></nut-avatar>
            <span class="ellipsis" style="margin-left: 10px">{{ food.foodName }}</span>
          </div>
          <div class="right">
            <span style="color: #f00">{{ food.caloriesBurned }}</span>
            <span style="opacity: 0.5"> 千卡</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <nut-datepicker v-model="today" v-model:visible="show" :min-date="minDate" :max-date="maxDate" @confirm="confirm"></nut-datepicker>
</template>

<style lang="scss">
.food-record {
  padding: 20px;
  height: 100vh;
  .content {
    .top {
      display: flex;
      justify-content: space-between;
    }
    .history {
      .food-item {
        margin-top: 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
