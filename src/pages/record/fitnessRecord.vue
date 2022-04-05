<script setup>
const show = ref(false)
const desc = ref('2022年05月10日')
const currentDate = new Date(2022, 4, 10, 10, 10)
const confirm = ({ selectedValue, selectedOptions }) => {
  desc.value = selectedOptions.map((option) => option.text).join('')
}
</script>

<template>
  <div class="food-record">
    <div class="top box">
      <nut-datepicker v-model="currentDate" v-model:visible="show" :min-date="minDate" :max-date="maxDate" :is-show-chinese="true" @confirm="confirm"></nut-datepicker>
    </div>
  </div>
</template>

<style lang="scss">
.food-record {
  padding: 20px;
}
</style>
