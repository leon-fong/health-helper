<script setup>
import { ref } from 'vue'
import { getRecommend } from '~@/apis/tool.js'
import { baseUrl } from '~@/config/index'
const props = defineProps({
  show: Boolean,
})
const emit = defineEmits(['close'])
const content = ref({})
getRecommend().then((res) => {
  if (res.code === 0) {
    res.data.path = baseUrl + '/' + res.data.path
    content.value = res.data
  }
})
</script>

<template>
  <nut-popup pop-class="popclass" :style="{ padding: '15px', borderRadius: '13px' }" v-model:visible="props.show" :z-index="100" @close="emit('close')">
    <image :src="content.path" mode="center"></image>
    <div class="text">
      <p class="title">{{ content.name }}</p>
      <p class="desc">{{ content.desc }}</p>
    </div>
  </nut-popup>
</template>

<style lang="scss">
.popclass {
  image {
    border-radius: 10px;
    width: 500rpx;
    height: 500rpx;
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
