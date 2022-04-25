<script setup>
import dayjs from 'dayjs'
import { getCurrentInstance } from 'vue'
import Taro, { useDidShow } from '@tarojs/taro'
import { getDietByDate, deleteDiet } from '~@/apis/record.js'
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
      res.data.ref = ref(null)
      foodList.value = res.data.report
      consume.value = res.data.hots
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
  // 禁止在非今天添加食物记录
  if (currentDate.value !== dayjs(today).format('YYYY-MM-DD')) return
  Taro.navigateTo({
    url: '/pages/record/foodList?type=' + type,
  })
}
const currentInstance = getCurrentInstance()
const handleDelete = async (id, index) => {
  currentInstance.ctx.$refs.foodsRef[index].close()
  await deleteDiet(id)
  init()
}
</script>

<template>
  <div class="food-record">
    <div class="menu">
      <div class="top box" @click="show = true">
        {{ currentDate }}
      </div>
      <div class="top box">共 {{ consume }} 千卡</div>
    </div>
    <div v-for="item in eatList" :key="item.value" class="content">
      <div class="top" @click="handleClick(item.value)">
        <div class="title">{{ item.label }}</div>
        <nut-icon name="plus"></nut-icon>
      </div>
      <div class="history">
        <nut-swipe ref="foodsRef" class="food-item" v-for="(food, index) in foodList[item.value]">
          <nut-cell round-radius="0" class="item-cell">
            <template #default>
              <div class="left">
                <nut-avatar size="normal" style="vertical-align: middle" :icon="baseUrl + '/' + food.image"></nut-avatar>
                <span class="ellipsis title" style="margin-left: 10px">{{ food.foodName }}</span>
              </div>
              <div class="right">
                <span style="color: #f00">{{ food.caloriesBurned }}</span>
                <span style="opacity: 0.5; font-size: 12px"> 千卡</span>
              </div>
            </template>
          </nut-cell>
          <template #right>
            <nut-button shape="square" style="height: 100%" @click="handleDelete(food.id, index)" type="danger">删除</nut-button>
          </template>
        </nut-swipe>
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
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      margin-top: 20px;
    }
  }
  .content {
    background-color: #fff;
    margin: 10px 0;
    border-radius: 13px;
    overflow: hidden;
    box-sizing: border-box;
    .top {
      display: flex;
      justify-content: space-between;
      margin: 5px 0;
      padding: 12px 18px;
      .title {
        font-weight: bold;
        font-size: 17px;
      }
    }
    .history {
      .food-item {
        border-top: 1rpx solid #f5f5f5;
        width: 100%;
        .item-cell {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .title {
            color: #555;
            font-size: 14px;
          }
        }

        .nut-cell {
          margin: 0;
          box-shadow: 0;
        }
      }
    }
  }
}
</style>
