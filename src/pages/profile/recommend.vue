<script setup>
import { ref } from 'vue'
import { getRecommend } from '~@/apis/tool.js'
import { baseUrl } from '~@/config/index'
// const content = ref({})
const list = ref([])
getRecommend().then((res) => {
  if (res.code === 0) {
    res.data.items.map((item) => {
      item.path = baseUrl + '/' + item.path
    })
    list.value = res.data.items
  }
})
</script>

<template>
  <div class="recommend">
    <nut-swiper :init-page="0" :loop="false">
      <nut-swiper-item v-for="item in list" :key="item.name">
        <img :src="item.path" />
        <div class="text">
          <p class="title">{{ item.name }}</p>
          <p class="desc">{{ item.desc }}</p>
        </div>
      </nut-swiper-item>
    </nut-swiper>
  </div>
</template>

<style lang="scss">
.recommend {
  width: 100%;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  .nut-swiper {
    height: 100%;
  }
  .nut-swiper-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  img {
    // border-radius: 10px;
    aspect-ratio: 1 / 1;
    width: 100%;
    height: auto;
  }
  .text {
    .title {
      margin: 10px;
      font-size: 26px;
      font-weight: bold;
    }
    .desc {
      color: #ccc;
      font-size: 22rpx;
      text-align: justify;
    }
  }
}
</style>
