<template>
  <article class="user-info">
    <nut-avatar size="large" :icon="userInfo.avatarUrl"></nut-avatar>
    <span class="ellipsis name">{{ userInfo.nickName }}</span>
  </article>
</template>

<script setup>
import Taro from '@tarojs/taro'

import { computed } from 'vue'
import { useStore } from '~@/store'

const auth = useStore('auth')
const userInfo = computed(() => auth.userInfo)
</script>
