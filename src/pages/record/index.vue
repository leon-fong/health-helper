<template>
  <div class="record">
    <div class="middle">
      <daily-record />
    </div>
    <div class="bottom">
      <div class="card box" style="margin-top: 20px; background-color: #f8f4e6" @click="toFoodRecord">
        <div class="top recommend">
          <div class="title">饮食摄入</div>
          <span class="text">推荐：{{ calorie }}</span>
        </div>
        <div class="value">
          <div class="num">
            <span class="num-value" style="color: #fbddb2">{{ consume }}</span>
            <span class="num-unit">千卡</span>
          </div>
          <i class="iconfont icon-medicine-bowl" style="color: #fbddb2"></i>
        </div>
      </div>
      <div class="card box" style="margin-top: 20px" @click="toSportRecord">
        <div class="top">
          <div class="title">运动消耗</div>
        </div>
        <div class="value">
          <div class="num">
            <span class="num-value">{{ sportConsume }}</span>
            <span class="num-unit">千卡</span>
          </div>
          <i class="iconfont icon-dumbell"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Taro, { useDidShow } from '@tarojs/taro'
import DailyRecord from './components/DailyRecord'
import { getCalorie } from '~@/apis/profile.js'
import { getFoodConsume, getSportConsume } from '~@/apis/record.js'
// 推荐
const calorie = ref(0)
// 已摄入
const consume = ref(0)

// 已消耗
const sportConsume = ref(0)
const toFoodRecord = () => {
  Taro.navigateTo({
    url: '/pages/record/foodRecord',
  })
}
const toSportRecord = () => {
  Taro.navigateTo({
    url: '/pages/record/sportRecord',
  })
}

useDidShow(() => {
  getCalorie().then((res) => {
    if (res.code === 0) {
      calorie.value = res.data.calorie
      getFoodConsume(res.data.calorie).then((res) => {
        if (res.code === 0) {
          consume.value = res.data.finishedToday
        }
      })
    }
  })
  getSportConsume().then((res) => {
    if (res.code === 0) {
      sportConsume.value = res.data
    }
  })
})
</script>

<style lang="scss">
Page {
  background-color: #fff;
}
.record {
  padding: 20px;

  .middle {
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    .title {
      color: #122f38;
      font-weight: bold;
      font-size: 20px;
    }
    .card {
      background-color: #f3f9f4;

      .recommend {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .text {
          font-size: 14px;
          color: #fbddb2;
        }
      }
      .value {
        margin-top: 10px;
        text-align: right;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .num {
          .num-value {
            font-size: 30px;
            font-weight: bold;
            color: #d7f0f0;
          }
          .num-unit {
            font-size: 14px;
            color: #ccc;
            margin-left: 5px;
          }
        }
        .iconfont {
          color: #d7f0f0;
          font-size: 70px;
        }
      }
    }
    .sport {
      background-color: #f8f4e6;
      .value {
        margin-top: 10px;

        .iconfont {
          color: #fbddb2;
          font-size: 70px;
        }
      }
    }
  }
}
</style>
