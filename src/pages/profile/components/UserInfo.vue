<template>
  <div class="user-box">
    <div class="card">
      <div class="header">
        <div class="left">
          <nut-avatar size="normal" style="vertical-align: middle" :icon="userInfo.avatar"></nut-avatar>
          <span class="ellipsis name">{{ userInfo.userName }}</span>
        </div>
        <div class="right">
          <nut-button size="mini" type="primary" @click="handleEdit">个人资料</nut-button>
        </div>
      </div>
      <div class="content">
        <ul>
          <li>
            <span>{{ userInfo.age }}</span>
            <span class="attr">年龄</span>
          </li>
          <li>
            <span>{{ userInfo.height }}</span>
            <span class="attr">身高</span>
          </li>
          <li>
            <span>{{ userInfo.weight }}</span>
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
const handleEdit = () => {
  emit('edit')
}
</script>

<style lang="scss">
.user-box {
  .card {
    background-color: #fff;
    margin: 20px 0;
    padding: 12px 18px;
    border-radius: 13px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      .name {
        margin-left: 10px;
        color: #666;
      }
    }
  }
  .content {
    margin-top: 25px;
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
