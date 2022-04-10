<template>
  <div class="record">
    <div class="header">
      <div class="box recommend" @click="isShowRecommend = true">
        <span class="title">推荐食谱</span>
      </div>
      <div class="box recommend" style="margin-left: 20px" @click="toCompare">
        <span class="title">食物对比</span>
      </div>
    </div>
    <div class="middle">
      <daily-record />
    </div>

    <div class="bottom">
      <div class="diet box" style="margin-top: 20px" @click="toFoodRecord">
        <div class="top">
          <div class="title">饮食摄入</div>
        </div>
        <div class="value">
          <i class="iconfont icon-medicine-bowl"></i>
        </div>
      </div>
      <div class="sport box" style="margin-top: 20px" @click="toSportRecord">
        <div class="top">
          <div class="title">运动消耗</div>
        </div>
        <div class="bottom">
          <div class="value">
            <i class="iconfont icon-dumbell"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Recommend :show="isShowRecommend" @close="isShowRecommend = false" />
</template>

<script setup>
import { ref } from 'vue'
import Taro from '@tarojs/taro'
import DailyRecord from './components/DailyRecord'
import Recommend from './components/Recommend.vue'
import UserInfo from '../profile/components/UserInfo.vue'

const isShowRecommend = ref(false)

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

const toCompare = () => {
  Taro.navigateTo({
    url: '/pages/record/foodCompare',
  })
}
</script>

<style lang="scss">
.record {
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    .recommend {
      width: 100%;
      padding: 30px auto;
      text-align: center;
    }
  }
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
    .diet {
      background-color: #f3f9f4;
      .value {
        margin-top: 10px;
        text-align: right;

        .iconfont {
          color: #d7f0f0;
          font-size: 70px;
        }
      }
    }
    .sport {
      background-color: #f4f7f6;
      .value {
        margin-top: 10px;
        text-align: right;

        .iconfont {
          color: #e1f2fd;
          font-size: 70px;
        }
      }
    }
  }
}
</style>
