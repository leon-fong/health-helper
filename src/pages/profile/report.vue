<template>
  <div class="eat-suggestion" v-if="isShow">
    <h3>血压情况</h3>
    <div class="box">{{ report.blood?.bloodPressureDesc }}</div>
    <!-- <div class="box">
      <b>建议：</b>
    </div> -->
    <h3>血糖情况</h3>
    <div class="box">{{ report.blood?.bloodSugarDesc }}</div>
    <h3>BMI</h3>
    <div class="bmi box">
      {{ report.weight?.bmi }}
      <span class="desc">{{ report.weight?.bmiDesc }}</span>
    </div>
  </div>
  <div v-else style="text-align: center">
    <h3>{{ tips }}</h3>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { healthReport } from '~@/apis/profile.js'

// todo: 健康建议
// const suggestion = {
//   高血糖
//   低血糖
//   偏瘦
//   偏胖
// }

const report = ref({})
const isShow = ref(false)
const tips = ref('')
healthReport().then((res) => {
  if (res.code === 0) {
    report.value = res.data
    isShow.value = true
  } else {
    isShow.value = false
    tips.value = res.msg
  }
})
</script>

<style lang="scss">
.eat-suggestion {
  padding: 20px;
  .box {
    text-align: center;
    color: $primary-color;
    font-size: 16px;
  }
  .bmi {
    .desc {
      margin-left: 5px;
      color: #ccc;
      font-size: 13px;
    }
  }
}
</style>
