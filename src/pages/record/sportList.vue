<script setup>
import { ref, computed, watchEffect, reactive } from 'vue'
import { baseUrl } from '~@/config/index'
import _ from 'lodash'
import Taro from '@tarojs/taro'
import { getSportList, recordSport } from '~@/apis/record.js'
const sportList = ref([])
const isShow = ref(false)
const customKey = reactive(['.'])
const currentValue = ref('')
const currentItem = ref({})
watchEffect(() => {
  console.log('[ currentValue ] >', currentValue.value)
})

getSportList().then((res) => {
  if (res.code === 0) {
    res.data.items.forEach((item) => {
      item.path = baseUrl + '/' + item.path
    })
    sportList.value = res.data.items
    console.log('[ list ] >', res.data.items)
  }
})

const handleSelect = (item) => {
  currentItem.value = item
  isShow.value = true
}

const handleSubmit = async () => {
  if (!currentValue.value) {
    isShow.value = false
    return
  }
  isShow.value = false
  const duration = Number(currentValue.value)
  const item = currentItem.value
  const options = {
    sportId: item.id,
    duration: duration,
    durationUnit: 'min',
    caloriesBurned: (duration * Number(item.caloriesBurned)) / 60,
  }
  const res = await recordSport([options])

  if (res.code === 0) {
    Taro.navigateBack()
  } else {
    Taro.showToast({
      title: res.msg,
      icon: 'none',
      duration: 1500,
    })
  }
}
</script>

<template>
  <div class="food-list">
    <div v-for="(item, index) in sportList" :key="item.id" @click="handleSelect(item)">
      <div class="list box">
        <div class="left">
          <nut-avatar size="normal" style="vertical-align: middle" :icon="item.path"></nut-avatar>
          <span class="ellipsis" style="margin-left: 10px">{{ item.name }}</span>
        </div>
        <div class="right">
          <span style="color: #f00">{{ item.caloriesBurned }}</span>
          <span style="opacity: 0.5"> 千卡/60分钟</span>
        </div>
      </div>
    </div>

    <nut-numberkeyboard :title="(currentValue || 0) + ' 分钟'" :overlay="true" v-model:value="currentValue" v-model:visible="isShow" :custom-key="customKey" @close="handleSubmit">
    </nut-numberkeyboard>
  </div>
</template>

<style lang="scss">
.food-list {
  padding: 20px;
  width: 100%;
  padding-bottom: constant(safe-area-inset-bottom + 60px);
  padding-bottom: calc(env(safe-area-inset-bottom) + 40px);
  box-sizing: border-box;
  .list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .active {
    background-color: #eff8e9;
    color: #6ab840;
  }

  .nut-numberkeyboard-overlay {
    background-color: rgba(0, 0, 0, 0.3) !important;
  }
}
</style>
