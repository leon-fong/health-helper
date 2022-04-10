<script setup>
import { floatMul } from '~@/utils/tool.js'
import { computed, ref } from 'vue'
import { addDaily } from '~@/apis/record.js'
import _ from 'lodash'
const list = ref([
  {
    label: 'weight',
    value: '体重',
    unit: 'kg',
    icon: 'icon-weight',
    bg: 'conic-gradient(from .5turn at center left, #68be8a, #79d6a0)',
  },
  {
    label: 'highBloodPressure',
    value: '高压',
    unit: 'mmHg',
    icon: 'icon-heartrate',
    bg: 'conic-gradient(from .5turn at 50% 110%, #5e4de1, #7e62ee)',
  },
  {
    label: 'lowBloodPressure',
    value: '低压',
    unit: 'mmHg',
    icon: 'icon-heartrate',
    bg: 'conic-gradient(from 90deg at bottom right, #637fee, #809af2)',
  },
  {
    label: 'bloodSugar',
    value: '血糖',
    unit: 'mmol/L',
    icon: 'icon-healthy-heart',
    bg: 'conic-gradient(from 90deg at bottom right, #e16f6b, #e37f80)',
  },
])

const multipleColumns = genrateColumn()

const pickerTitle = ref('')

const isShow = ref(false)
const currentType = ref('')

const handClick = (item) => {
  isShow.value = true
  currentType.value = item.label
  pickerTitle.value = `${item.value}(${item.unit})`
}

const handleConfirm = ({ selectedValue }) => {
  const result = selectedValue.reduce((pre, cur) => pre + cur, 0)
  const options = {
    [currentType.value]: result,
  }
  addDaily(options)
}

function genrateColumn() {
  const a = _.times(100, (i) => ({ text: String(i + 1), value: i + 1 }))
  const b = _.times(10, (i) => ({ text: String(floatMul(i, 0.1)), value: floatMul(i, 0.1) }))
  return [a, b]
}
</script>

<template>
  <div class="nav" v-for="item in list" :key="item.label">
    <div class="box daily" :style="{ background: item.bg }" @click="handClick(item)">
      <i :class="['iconfont', item.icon]"></i>
    </div>
    <span class="value">{{ item.value }}</span>
  </div>
  <nut-picker v-model:visible="isShow" :columns="multipleColumns" :title="pickerTitle" @close="isShow = false" @confirm="handleConfirm" />
</template>

<style lang="scss">
.nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .value {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
  }
}
.daily {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px 15px;
  margin-bottom: 0;

  i {
    font-size: 30px;
    color: #fff;
  }
}
</style>
