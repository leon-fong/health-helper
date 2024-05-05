<script setup>
import { ref, unref, computed } from 'vue'
import { baseUrl } from '~@/config/index'
import _ from 'lodash'
import Taro, { useRouter, useReachBottom } from '@tarojs/taro'
import { getFoodList, recordDiet } from '~@/apis/record.js'
let foodType = ''
let isCompare = false
const foodList = ref([])
const router = useRouter()
foodType = router.params?.type
isCompare = router.params?.isCompare

const page = ref(1)
const pageSize = 10
const noMore = ref(false)

const checkedList = computed(() => {
  return foodList.value.filter((item) => item.isChecked)
})


useReachBottom(() => {
  if (page.value * pageSize == foodList.value.length) {
    page.value = page.value + 1
    createList()
  } else {
    noMore.value = true
  }
})

function createList() {
  getFoodList(page.value, pageSize).then((res) => {
    if (res.code === 0) {
      const data = res.data.items.map(({ attrs, ...rest }) => {
        const attr = Object.fromEntries(attrs.map(({ name, value }) => [name, value]));
        return {
          ...attr,
          ...rest,
          isChecked: false
        };
      });

      console.log(data)


      if (data.length == pageSize) {
        foodList.value.push(...data)
        noMore.value = false
      } else {
        foodList.value.push(...data)
        noMore.value = true
      }
    }
  })
}


const handleSelect = (index) => {
  if (foodList.value[index].isChecked) {
    foodList.value[index].isChecked = false
    return
  }
  if (isCompare && checkedList.value.length === 2) {
    Taro.showToast({
      title: '最多只能选择两种食物进行对比',
      icon: 'none',
      duration: 1500,
    })
    return
  }
  foodList.value[index].isChecked = !foodList.value[index].isChecked
}

createList()

async function forRecord() {
  const list = _.map(unref(checkedList), 
  (item) => {
    return {
      foodName:item.name,
      foodPath:item.path,
      caloriesBurned: Number(item.calories),
    }
  })
  const options = {
    foodType: foodType,
    foods: list,
  }
  const res = await recordDiet(options)
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
function forCompare() {
  if (checkedList.value.length < 2) {
    Taro.showToast({
      title: '需要选择两种食物才能进行对比',
      icon: 'none',
      duration: 2000,
    })
    return
  }

  const pages = getCurrentPages()
  const current = pages[pages.length - 1]
  const eventChannel = current.getOpenerEventChannel()

  eventChannel.emit('change', { data: checkedList.value })
  Taro.navigateBack()
}

const handleSubmit = () => {
  isCompare ? forCompare() : forRecord()
}
</script>

<template>
  <div class="food-list">
    <div v-for="(item, index) in foodList" :key="item.id" @click="handleSelect(index)">
      <div class="list box" :class="{ active: item.isChecked }">
        <div class="left">
          <nut-avatar size="normal" style="vertical-align: middle" :icon="baseUrl + '/' + item.path" />
          <!-- <nut-badge v-else value="AI" top="5" right="10">
            <nut-avatar size="normal" style="vertical-align: middle" :icon="item.path" />
          </nut-badge> -->
          <span class="ellipsis" style="margin-left: 10px">{{ item.name }}</span>
        </div>
        <div class="right">
          <span style="color: #f00">{{ item?.calories }}</span>
          <span style="opacity: 0.5"> 千卡</span>
        </div>
      </div>
    </div>
    <div class='nomore' v-if='noMore'>暂无更多数据</div>
    <div class="submit safe-area-bottom" v-if="checkedList.length">
      <nut-button block type="primary" @click="handleSubmit">确 定</nut-button>
    </div>
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
    border: 1px solid transparent;
  }

  .active {
    background-color: #eff8e9;
    color: #6ab840;
    border: 1px solid #6ab840;
  }
}

.submit {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #f4f4f4;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  box-sizing: border-box;
  z-index: 10;
}
</style>
