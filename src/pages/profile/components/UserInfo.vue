<template>
  <div class="user-box">
    <div class="card">
      <div class="head">
        <div class="left">
          <nut-avatar size="large" class="avatar" :icon="userInfo.avatar"></nut-avatar>
          <span class="ellipsis name">{{ userInfo.userName }}</span>
        </div>
        <div class="right">
          <nut-button size="mini" type="primary" @click="handleEdit">个人资料</nut-button>
        </div>
      </div>
      <div class="content">
        <ul>
          <li>
            <span class="num">{{ userInfo.age || 0 }}</span>
            <span class="attr">年龄</span>
          </li>
          <li>
            <span class="num">{{ userInfo.height || 0 }}</span>
            <span class="attr">身高</span>
          </li>
          <li>
            <span class="num">{{ userInfo.weight || 0 }}</span>
            <span class="attr">体重</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmits } from 'vue'
import { useStore } from '~@/store'
const auth = useStore('auth')
const userInfo = computed(() => auth.userInfo)
const emit = defineEmits(['edit'])
auth.login()
auth.setUserInfo()

const handleEdit = () => {
  emit('edit')
}
</script>

<style lang="scss">
.user-box {
  .card {
    position: relative;
    background-color: #fff;
    margin: 20px 0;
    padding: 12px 18px;
    border-radius: 13px;
  }
  .head {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .left {
      position: absolute;
      top: -25%;
      left: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .name {
        margin-top: 10rpx;
        color: #666;
      }
    }
  }
  .content {
    margin-top: 40px;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      justify-content: space-between;
      li {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        span {
          text-align: center;
          font-size: 16px;
        }
        .num {
          font-size: 18px;
          font-weight: bold;
        }
        .attr {
          font-size: 12px;
          margin-top: 3px;
          color: #666;
        }
      }
    }
  }
}
</style>
