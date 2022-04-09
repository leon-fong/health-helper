<script setup>
import Taro from '@tarojs/taro'
import { ref } from 'vue'
const category = ['热量(千卡)', '蛋白质(克)', '脂肪(克)', '碳水化合物(克)', '无机盐(克)']
const list = ref([])
const isShow = ref(false)
const handleClear = () => {
  list.value = []
  isShow.value = false
}
const toAdd = () => {
  Taro.navigateTo({
    url: '/pages/record/foodList?isCompare=true',
    events: {
      change(options) {
        if (options) {
          console.log('[ options ] >', options)
          list.value = options.data
          isShow.value = true
        }
      },
    },
  })
}
</script>

<template>
  <div class="compare">
    <div v-if="isShow">
      <div class="group">
        <div class="category" style="width: 33%">
          <div class="category-title">营养元素</div>
          <template v-for="item in category" :key="index">
            <span>{{ item }}</span>
          </template>
        </div>
        <div class="content" style="width: 66%">
          <template v-for="item in list" :key="item.id">
            <div class="content-item">
              <div class="item-avatar">
                <nut-avatar size="normal" style="vertical-align: middle" :icon="item.path"></nut-avatar>
                <span class="ellipsis name">{{ item.name }}</span>
              </div>
              <span>{{ item.attrs.calories.value }}</span>
              <span>{{ item.attrs.protein.value }}</span>
              <span>{{ item.attrs.fat.value }}</span>
              <span>{{ item.attrs.carbohydrate.value }}</span>
              <span>{{ item.attrs.inorganicSalt.value }}</span>
            </div>
          </template>
        </div>
      </div>
      <nut-button block type="primary" style="margin-top: 20px" @click="handleClear">清 空</nut-button>
    </div>
    <div class="prepare" v-else>
      <div class="add" @click="toAdd">
        <nut-icon name="uploader" size="40"></nut-icon>
      </div>
      <p>点击加号，添加 2 种食物进行对比</p>
    </div>
  </div>
</template>

<style lang="scss">
.prepare {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  color: #666;
  height: 100vh;
  .add {
    border-radius: 13px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $primary-color;
    width: 100px;
    height: 100px;
  }
}

.group {
  display: flex;
  justify-content: space-evenly;
  span {
    margin: 0;
    display: block;
    height: 40px;
    line-height: 40px;
    color: #444;
    font-size: 14px;
    text-align: center;
    border-bottom: 1rpx solid #e8eaee;
    width: 100%;
  }
  .category {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #e8eaed;
    &-title {
      height: 80px;
      line-height: 80px;
      text-align: center;
    }
  }
  .content {
    display: flex;
    justify-content: space-evenly;
    .content-item {
      display: flex;
      flex-direction: column;
      width: 50%;
      .item-avatar {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 10px;
        height: 80px;
        line-height: 80px;
      }
    }
    .content-item:first-child {
      border-right: 1rpx solid #e8eaed;
    }
  }
}
</style>
