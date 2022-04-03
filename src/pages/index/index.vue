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
    const login = (e) => {
      wx.getUserProfile({
        desc: 'desc',
        success: (res) => {
          const { rawData, signature } = res
          wx.login({
            success: (res) => {
              if (res.code) {
                wx.request({
                  url: 'http://xlight.vaiwan.cn/health/user/login',
                  data: {
                    code: res.code,
                    rawData,
                    signature,
                  },
                  header: {
                    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6',
                    'content-type': 'application/json', // 默认值
                  },
                  method: 'POST',
                  success: (res) => {
                    // console.log('[ res ] >', res)
                    const token = res.data
                    edit(token)
                  },
                })
              }
            },
          })
        },
      })
    }

    const edit = (token) => {
      wx.request({
        url: 'http://xlight.vaiwan.cn/health/user/login',
        data: {
          age: 112,
        },
        header: {
          token: token,
        },
        method: 'PATCH',
        success: (res) => {
          console.log('[ res ] >', res)
          // const token = res.data
        },
      })
    }

    return {
      login,
    }
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
