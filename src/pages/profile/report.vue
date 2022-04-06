<template>
  <div class="eat-suggestion">report</div>
</template>

<script setup>
import Taro from '@tarojs/taro'
import { healthReport } from '~@/apis/profile.js'
healthReport()
</script>

<style lang="scss"></style>
