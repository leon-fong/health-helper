<script setup>
import { ref, unref, computed } from 'vue'
import { baseUrl } from '~@/config/index'
import _ from 'lodash'
import Taro, { useRouter } from '@tarojs/taro'
import { getFoodList, recordDiet } from '~@/apis/record.js'
let foodType = ''
const foodList = ref([])
const router = useRouter()
foodType = router.params?.type

const checkedList = computed(() => {
  return foodList.value.filter((item) => item.isChecked)
})

getFoodList().then((res) => {
  if (res.code === 0) {
    res.data.items.forEach((item) => {
      item.path = baseUrl + '/' + item.path
      item.attrs = JSON.parse(item.attrs)
      item.isChecked = false
    })
    foodList.value = res.data.items
    console.log('[ list ] >', res.data.items)
  }
})

const handleSelect = (index) => {
  const list = unref(foodList)
  foodList.value[index].isChecked = !foodList.value[index].isChecked
}

const handleSubmit = async () => {
  console.log('[ checkList ] >', checkedList.value, foodList.value)
  const list = _.map(unref(checkedList), (item) => {
    return {
      foodId: item.id,
      caloriesBurned: Number(item.attrs.calories.value),
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
      duration: 2000,
    })
  }
}
</script>

<template>
  <div class="food-list">
    <div v-for="(item, index) in foodList" :key="item.id" @click="handleSelect(index)">
      <div class="list box" :class="{ active: item.isChecked }">
        <div class="left">
          <nut-avatar size="normal" style="vertical-align: middle" :icon="item.path"></nut-avatar>
          <span class="ellipsis" style="margin-left: 10px">{{ item.name }}</span>
        </div>
        <div class="right">
          <span style="color: #f00">{{ item.attrs.calories.value }}</span>
          <span style="opacity: 0.5"> 千卡</span>
        </div>
      </div>
    </div>
    <div class="submit safe-area-bottom">
      <nut-button :disabled="!checkedList.length" block type="primary" @click="handleSubmit">确 定</nut-button>
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
  }
  .active {
    background-color: #eff8e9;
    color: #6ab840;
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
  box-sizing: border-box;
}
</style>
