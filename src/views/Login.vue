<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/user';

const router = useRouter();
const userStore = useUserStore();

// 模拟登录函数
const handleLogin = async () =>{
  await userStore.login('user') // 模拟以管理员身份登录
  router.push('/'); // 登录成功后跳转到首页
}

</script>
<template>
  <div class="login-container">
    <div class="card">
      <h1>系统登录</h1>
      <p>当前状态：Phase 3 路由守卫实战</p>
      <button @click="handleLogin">模拟管理员登录 (获取 Token)</button>
    </div>
  </div>
</template>

<style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  .card{
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    text-align: center;
  }
</style>