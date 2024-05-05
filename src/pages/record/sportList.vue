<script setup>
import { ref, computed, watchEffect, reactive } from 'vue'
import { baseUrl } from '~@/config/index'
import _ from 'lodash'
import Taro, { useReachBottom } from '@tarojs/taro'
import { getSportList, recordSport } from '~@/apis/record.js'
const sportList = ref([])
const isShow = ref(false)
const customKey = reactive(['.'])
const currentValue = ref('')
const currentItem = ref({})

const page = ref(1)
const pageSize = 10
const noMore = ref(false)

useReachBottom(() => {
  if (page.value * pageSize == sportList.value.length) {
    page.value = page.value + 1
    createList()
  } else {
    noMore.value = true
  }
})

function createList() {
  getSportList(page.value, pageSize).then((res) => {
    if (res.code === 0) {
      const data = res.data.items.map(({ attrs, ...rest }) => {
        const attr = Object.fromEntries(attrs.map(({ name, value }) => [name, value]));
        return {
          ...attr,
          ...rest,
        };
      });


      if (data.length == pageSize) {
        sportList.value.push(...data)
        noMore.value = false
      } else {
        sportList.value.push(...data)
        noMore.value = true
      }
    }
  })
}

createList()

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
    sportName: item.name,
    sportPath: item.path,
    duration: duration,
    durationUnit: 'min',
    caloriesBurned: (duration * Number(item.calories)) / 60,
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
          <nut-avatar size="normal" style="vertical-align: middle" :icon="baseUrl + '/' +item.path"></nut-avatar>
          <span class="ellipsis" style="margin-left: 10px">{{ item.name }}</span>
        </div>
        <div class="right">
          <span style="color: #f00">{{ item.calories }}</span>
          <span style="opacity: 0.5"> 千卡/60分钟</span>
        </div>
      </div>
    </div>
    <div class="nomore" v-if="noMore">暂无更多数据</div>
    <nut-numberkeyboard :title="(currentValue || 0) + ' 分钟'" :overlay="true" v-model:value="currentValue"
      v-model:visible="isShow" :custom-key="customKey" @close="handleSubmit">
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
