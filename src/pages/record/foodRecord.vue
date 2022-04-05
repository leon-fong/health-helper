<script setup>
import Taro from '@tarojs/taro'

import dayjs from 'dayjs'
import { ref } from 'vue'
const show = ref(false)
const minDate = new Date(2020, 0, 1)
const maxDate = new Date(2025, 10, 1)
const today = new Date()
const currentDate = ref(dayjs(today).format('YYYY-MM-DD'))
const confirm = ({ selectedValue, selectedOptions }) => {
  const value = selectedOptions.map((option) => option.text).join('-')
  currentDate.value = value

  console.log('[ currentDate ] >', currentDate.value)
}

const addFood = () => {
  Taro.navigateTo({
    url: '/pages/record/foodList',
  })
}
</script>

<template>
  <div class="food-record">
    <div class="top box" @click="show = true">
      {{ currentDate }}
    </div>
    <div class="content box">
      <div class="top" @click="addFood">
        <div class="title">早餐</div>
        <nut-icon name="plus"></nut-icon>
      </div>
      <div class="history">内容</div>
    </div>
  </div>
  <nut-datepicker v-model="today" v-model:visible="show" :min-date="minDate" :max-date="maxDate" @confirm="confirm"></nut-datepicker>
</template>

<style lang="scss">
.food-record {
  padding: 20px;
  height: 100vh;
  .top {
    height: 100px;
  }
  .content {
    .top {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
