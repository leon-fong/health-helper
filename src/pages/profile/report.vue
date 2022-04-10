<template>
  <div class="eat-suggestion">
    <h3>血压情况</h3>
    <div class="box">{{ report.blood?.bloodPressureDesc }}</div>
    <h3>血糖情况</h3>
    <div class="box">{{ report.blood?.bloodSugarDesc }}</div>
    <h3>BMI</h3>
    <div class="bmi box">
      {{ report.weight?.bmi }}
      <span class="desc">{{ report.weight?.bmiDesc }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { healthReport } from '~@/apis/profile.js'
const report = ref({})
healthReport().then((res) => {
  if (res.code === 0) {
    report.value = res.data
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
