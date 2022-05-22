<script setup>
import dayjs from 'dayjs'
import { getCurrentInstance } from 'vue'
import Taro, { useDidShow } from '@tarojs/taro'
import { getSportByDate, deleteSport } from '~@/apis/record.js'
import { baseUrl } from '~@/config/index'
import { ref } from 'vue'
import WeStep from './components/WeStep.vue'

const isShowWeStep = ref(false)
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
      sportList.value = res.data.report.items
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

const handleClick = () => {
  // 禁止在非今天添加运动记录
  if (currentDate.value !== dayjs(today).format('YYYY-MM-DD')) return
  Taro.navigateTo({
    url: '/pages/record/sportList',
  })
}

const currentInstance = getCurrentInstance()
const handleDelete = async (id, index) => {
  currentInstance.ctx.$refs.sportsRef[index].close()
  await deleteSport(id)
  init()
}
</script>

<template>
  <div class="sport-record">
    <nut-cell style="margin-top: 20px" icon="dshop" title="微信步数" @click="isShowWeStep = true" is-link></nut-cell>

    <div class="menu">
      <div class="top box" @click="show = true">
        {{ currentDate }}
      </div>
      <div class="top box">
        共
        <span style="font-weight: bold; margin: 0 5px"> {{ consume }} </span>
        千卡
      </div>
    </div>
    <div class="content">
      <div class="top" @click="handleClick">
        <div class="title">运动</div>
        <nut-icon name="plus"></nut-icon>
      </div>
      <div class="history">
        <nut-swipe ref="sportsRef" class="food-item" v-for="(item, index) in sportList">
          <nut-cell round-radius="0" class="item-cell">
            <template #default>
              <div class="left">
                <nut-avatar size="normal" style="vertical-align: middle" :icon="baseUrl + '/' + item.image"></nut-avatar>
                <span class="ellipsis title" style="margin-left: 10px">{{ item.sportName }}</span>
              </div>
              <div class="right">
                <span style="color: #f00">{{ item.caloriesBurned }}</span>
                <span style="opacity: 0.5; font-size: 12px"> 千卡</span>
              </div>
            </template>
          </nut-cell>
          <template #right>
            <nut-button shape="square" style="height: 100%" @click="handleDelete(item.id, index)" type="danger">删除</nut-button>
          </template>
        </nut-swipe>
      </div>
    </div>
  </div>
  <nut-datepicker v-model="today" v-model:visible="show" :min-date="minDate" :max-date="maxDate" @confirm="confirm"></nut-datepicker>
  <we-step v-model="isShowWeStep" />
</template>

<style lang="scss">
.sport-record {
  padding: 0 20px;
  height: 100vh;
  .nut-cell__title {
    margin-left: 6px;
  }
  .menu {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    .top {
      flex: 1;
      // margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
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
