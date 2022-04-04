<template>
  <view class="index">
    <nut-button type="primary" open-type="getUserInfo" @click="login">开始使用</nut-button>
  </view>
</template>

<script>

export default {
  name: 'Index',
  components: {},
  setup() {
   


  },
}
</script>

<style lang="scss">
.index {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
