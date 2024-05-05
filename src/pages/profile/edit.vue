<template>
  <div class="edit">
    <nut-form>
      <nut-form-item label="性别" body-align="right">
        <nut-radiogroup v-model.number="form.gender" direction="horizontal">
          <nut-radio label="0">男</nut-radio>
          <nut-radio label="1">女</nut-radio>
        </nut-radiogroup>
      </nut-form-item>
      <nut-form-item label="身高" body-align="right">
        <nut-input :border="false" placeholder="厘米" v-model="form.height" :hasBorder="false" max-length="3" input-align="right" type="digit" />
      </nut-form-item>
      <nut-form-item label="体重" body-align="right">
        <nut-input :border="false" placeholder="公斤" v-model="form.weight" :hasBorder="false" max-length="3" input-align="right" type="digit" />
      </nut-form-item>
      <nut-form-item label="年龄" body-align="right">
        <nut-input :border="false" placeholder="岁" v-model="form.age" :hasBorder="false" max-length="2" input-align="right" type="number" />
      </nut-form-item>
    
      <nut-cell title="运动等级" :desc="formatType" @click="isShow = true"></nut-cell>
      <nut-picker v-model:visible="isShow" :columns="multipleColumns" title="运动等级" @close="isShow = false" @confirm="handleConfirm" />

    </nut-form>
    <div class="submit safe-area-bottom">
      <nut-button block :disabled="isDisabled" type="primary" @click="handleSubmit">保 存</nut-button>
    </div>
  </div>
</template>

<script setup>
import Taro from '@tarojs/taro'
import { ref, computed, watch } from 'vue'
import { useStore } from '~@/store'
import _ from 'lodash'
import { editUserInfo } from '~@/apis/profile.js'

const auth = useStore('auth')
const userInfo = computed(() => auth.userInfo)

const SPORTTYPES = {
  infrequentExercise: '低',
  moderateExercise: '中',
  exerciseRegularly: '高',
  lotsOfExercise: '很高',
}

const formatType = computed(() => {
  return SPORTTYPES[form.value.sportType]
})

const multipleColumns = [
  [
    { text: '低', value: 'infrequentExercise' },
    { text: '中', value: 'moderateExercise' },
    { text: '高', value: 'exerciseRegularly' },
    { text: '很高', value: 'lotsOfExercise' },
  ],
]

const isShow = ref(false)
const form = ref({
  gender: 0,
  height: null,
  weight: null,
  age: null,
  sportType: 'moderateExercise',
})

const keys = _.keys(form.value)
const result = _.pick(userInfo.value, keys)
for (const key in result) {
  if (key !== 'gender' && result[key] === 0) {
    result[key] = null
  }
}
form.value = result
const isDisabled = computed(() => {
  const obj = _.pick(form.value, ['height', 'weight', 'age'])
  for (const key in obj) {
    if (!obj[key]) {
      return true
    }
  }
  return false
})

const handleConfirm = ({ selectedValue }) => {
  form.value.sportType = selectedValue[0]
}

const handleSubmit = () => {
  editUserInfo({ ...form.value }).then(async (res) => {
    if (res.code === 0) {
      auth.login()
      auth.setUserInfo()

      Taro.navigateBack()
    } else {
      Taro.showToast({
        title: res.msg,
        icon: 'none',
        duration: 2000,
      })
    }
  })
}
</script>

<style lang="scss">
.nut-input {
  padding: 0;
}
.submit {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
}
</style>
