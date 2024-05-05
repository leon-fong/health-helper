<script setup>
import dayjs from 'dayjs'
import { getCurrentInstance } from 'vue'
import Taro, { useDidShow, useRouter } from '@tarojs/taro'
import { getDietByDate, deleteDiet } from '~@/apis/record.js'
import { baseUrl } from '~@/config/index'
import { ref, computed } from 'vue'

const eatList = [
  {
    label: '早餐',
    value: 'breakfast',
  },
  {
    label: '午餐',
    value: 'lunch',
  },
  {
    label: '晚餐',
    value: 'dinner',
  },
]

const consume = ref(0)
const visible = ref(false);
const show = ref(false)
const minDate = new Date(2020, 0, 1)
const maxDate = new Date(2025, 10, 1)
const today = new Date()
const currentDate = ref(dayjs(today).format('YYYY-MM-DD'))
const foodList = ref([])
const resultList = ref([])
const currentTempPath = ref('')
const currentInstance = getCurrentInstance()
const router = useRouter()
const init = () => {
  getDietByDate(currentDate.value).then((res) => {
    if (res.code === 0) {
      res.data.ref = ref(null)
      foodList.value = res.data.report
      consume.value = res.data.hots
    }
  })
}

useDidShow(() => {
  init()
})

const isCheckedToday = computed(() => currentDate.value === dayjs(today).format('YYYY-MM-DD'))

const confirm = ({ selectedValue, selectedOptions }) => {
  const value = selectedOptions.map((option) => option.text).join('-')
  currentDate.value = value
  init()
}

const handleClick = (type) => {
  // 禁止在非今天添加食物记录
  if (!isCheckedToday.value) return

  const recommend = Number(router.params.recommendCalorie || 0)
  if (consume.value > recommend) {
    Taro.showModal({
      title: '提示',
      content: '当前已超过推荐热量值，确定要继续添加吗？',
      success: function (res) {
        if (res.confirm) {
          Taro.navigateTo({
            url: '/pages/record/foodList?type=' + type,
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  } else {
    Taro.navigateTo({
      url: '/pages/record/foodList?type=' + type,
    })
  }

}

const handleDelete = async (id, index) => {
  currentInstance.ctx.$refs.foodsRef[index].close()
  await deleteDiet(id)
  init()
}

const handleSelect = (index) => {
  if (resultList.value[index]?.isChecked) return;
  resultList.value = resultList.value.map(item => {
    if (item.isChecked && item !== resultList.value[index]) {
      return { ...item, isChecked: false };
    } else if (item === resultList.value[index]) {
      return { ...item, isChecked: true };
    } else {
      return item;
    }
  });
}

const handleConfirm = () => {
  const checked = resultList.value.filter(item => item.isChecked)
  // const filePath = /\.jpg$/.test(currentTempPath.value) ? currentTempPath.value.replace(/\.jpg$/, ".jpeg") : currentTempPath.value
  const filePath = currentTempPath.value
  Taro.uploadFile({
    url: baseUrl + '/admin/addFood',
    filePath,
    name: "file",
    header: {
      chartset: "utf-8",
      "content-type": "multipart/form-data"
    },
    formData: {
      token: '',
      name: checked[0].name,
      attrs: JSON.stringify({ "protein": { "name": "蛋白质含量(%)", "value": "-" }, "fat": { "name": "脂肪含量(%)", "value": "-" }, "carbohydrate": { "name": "碳水化合物含量(%)", "value": "-" }, "inorganicSalt": { "name": "无机盐含量(%)", "value": "-" }, "calories": { "name": "卡路里", "value": checked[0].calorie }, "type": { "name": "饮食来源", "value": "BaiduAi" } })
    },
    success: (result) => {
      if (result.statusCode === 200) {
        const data = JSON.parse(result.data)
        if (data.code === 0) {
          Taro.showToast({
            title: '已添加',
            icon: 'success',
            duration: 1500,
          })
        } else {
          Taro.showToast({
            title: data.msg,
            icon: 'none',
            duration: 1500,
          })
          console.log('出错了～', data.msg);
        }
      }
    },
    fail: function (e) {

    }
  })
}

const handleScan = () => {
  Taro.chooseMedia({
    count: 1,
    mediaType: ['image'],
    sizeType: ['compressed'],
    success: (res) => {
      const tempFilePaths = res.tempFiles[0].tempFilePath;
      const tempFilesSize = res.tempFiles[0].size; //获取图片的大小，单位B

      if (tempFilesSize <= 3000000) {
        //图片小于或者等于3M时 可以继续
        Taro.showLoading({
          title: '识别中...'
        })
        Taro.uploadFile({
          url: baseUrl + '/food/dishRecognition',
          filePath: tempFilePaths,
          name: "file",
          header: {
            chartset: "utf-8",
            "content-type": "multipart/form-data"
          },
          formData: {
            token: '',
            type: 'BaiduAi'
          },
          success: (result) => {
            Taro.hideLoading()
            if (result.statusCode === 200) {
              const data = JSON.parse(result.data)
              if (data.code === 0) {
                visible.value = true;
                currentTempPath.value = tempFilePaths
                resultList.value = data.data.items.filter(item => item.calorie)
                resultList.value[0].isChecked = true
              } else {
                Taro.showToast({
                  title: data.msg,
                  icon: 'none',
                  duration: 1500,
                })
                console.log('出错了～', data.msg);
              }
            }
          },
          fail: function (e) {
            Taro.hideLoading()
            Taro.showToast({
              icon: 'none',
              title: '识别失败～'
            })
          }
        })
      } else {
        Taro.showToast({
          title: "上传图片不能大于3M哦～",
          icon: "error"
        })
      }
    }
  })
}

</script>

<template>
  <div class="food-record">
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
    <div v-for="item in eatList" :key="item.value" class="content">
      <div class="top" @click="handleClick(item.value)">
        <div class="title">{{ item.label }}</div>
        <nut-icon v-show="isCheckedToday" name="plus" size="24"></nut-icon>
      </div>
      <div class="history">
        <nut-swipe ref="foodsRef" class="food-item" v-for="(food, index) in foodList[item.value]">
          <nut-cell round-radius="0" class="item-cell">
            <template #default>
              <div class="left">
                <nut-avatar size="normal" style="vertical-align: middle" :icon="baseUrl + '/' + food.image"></nut-avatar>
                <span class="ellipsis title" style="margin-left: 10px">{{ food.foodName }}</span>
              </div>
              <div class="right">
                <span style="color: #f00">{{ food.caloriesBurned }}</span>
                <span style="opacity: 0.5; font-size: 12px"> 千卡</span>
              </div>
            </template>
          </nut-cell>
          <template #right>
            <nut-button shape="square" style="height: 100%" @click="handleDelete(food.id, index)"
              type="danger">删除</nut-button>
          </template>
        </nut-swipe>
      </div>
    </div>
    <!-- <div class="submit safe-area-bottom">
      <nut-button block type="primary" icon="photograph" @click="handleScan">AI 菜品识别</nut-button>
    </div> -->
  </div>
  <nut-datepicker v-model="today" v-model:visible="show" :min-date="minDate" :max-date="maxDate"
    @confirm="confirm"></nut-datepicker>
  <nut-dialog title="识别结果" v-model:visible="visible" @ok="handleConfirm">

    <div v-for="(item, index) in resultList" :key="item.probability" @click="handleSelect(index)">
      <div class="result__list" :class="{ result__active: item.isChecked }">
        <div class="left" style="display: flex;align-items: center;">
          <nut-avatar size="normal" style="vertical-align: middle" :icon="currentTempPath"></nut-avatar>
          <div style="display: flex; flex-direction: column; margin-left: 10px">
            <span class="ellipsis">{{ item.name }}</span>
            <span class="ellipsis" style=" font-size: 10px; color: #ccc;">{{ (item.probability *
              100).toFixed(2) + '%' }}</span>
          </div>
        </div>
        <div class="right">
          <span style="color: #f00">{{ item.calorie }}</span>
          <span style="opacity: 0.5"> 千卡</span>
        </div>
      </div>
    </div>
  </nut-dialog>
</template>

<style lang="scss">
.food-record {
  padding: 0 20px;
  height: calc(100vh - 70px - env(safe-area-inset-bottom));
  overflow-y: auto;

  .menu {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    .top {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      margin-top: 20px;
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
  }
}
</style>
