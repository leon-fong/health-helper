<script setup>
import dayjs from 'dayjs'
import Taro, { useDidShow } from '@tarojs/taro'
import { getSportByDate, getSportConsume } from '~@/apis/record.js'
import { baseUrl } from '~@/config/index'
import { ref } from 'vue'

const consume = ref(0)

const show = ref(false)
const minDate = new Date(2020, 0, 1)
const maxDate = new Date(2025, 10, 1)
const today = new Date()
const currentDate = ref(dayjs(today).format('YYYY-MM-DD'))
const sportList = ref([])

const init = () => {
  getSportByDate(currentDate.value).then((res) => {
    if (res.code === 0) {
      sportList.value = res.data.items
      getSportConsume().then((res) => {
        if (res.code === 0) {
          consume.value = res.data
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

const handleClick = () => {
  Taro.navigateTo({
    url: '/pages/record/sportList',
  })
}
</script>

<template>
  <div class="sport-record">
    <div class="menu">
      <div class="top box" @click="show = true">
        {{ currentDate }}
      </div>
      <div class="top box">共 {{ consume }} 千卡</div>
    </div>
    <div class="content box" @click="handleClick">
      <div class="top">
        <div class="title">运动</div>
        <nut-icon name="plus"></nut-icon>
      </div>
      <div class="history">
        <div class="food-item" v-for="food in sportList">
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
.sport-record {
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
