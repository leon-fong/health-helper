<template>
  <div class="box eat-suggestion">
    <div class="title">推荐热量</div>
    <div class="core">{{ calorie }}</div>
    <div class="unit">千卡</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getCalorie } from '~@/apis/profile.js'
const calorie = ref(0)
getCalorie().then((res) => {
  if (res.code === 0) {
    calorie.value = res.data.calorie
  }
})
</script>

<style lang="scss">
.eat-suggestion {
  flex: 1;
  margin: 0;
  .title {
    text-align: left;
    font-size: 14px;
    color: #333;
  }
  .core {
    text-align: center;
    font-size: 30px;
    color: #f4603d;
    font-weight: bold;
    margin: 5px 0;
  }
  .unit {
    text-align: right;
    font-size: 14px;
    color: #999;
  }
}
</style>
