<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/user';
import type { BasicColumn } from "../components/BasicTable.vue";
import { useTable } from "../hooks/useTable";
import BasicTable from "../components/BasicTable.vue";
const router = useRouter();
const userStore = useUserStore()


const columns: BasicColumn[] = [
  { title: 'ID', dataIndex: 'id', width: '50px' },
  { title: '任务内容', dataIndex: 'content' }, // 对应数据里的 content 字段
  { title: '截止时间', dataIndex: 'deadline' }, // 对应数据里的 deadline 字段
  { title: '是否完成', dataIndex: 'isDone' } // 对应数据里的 isDone 字段
]

const getTableDataApi = async () => {

  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: '1', content: '学习 TS 泛型', isDone: false, deadline: '2024-12-12' },
    { id: '2', content: '重构简历', isDone: true, deadline: '2024-11-11' },
    { id: '3', content: '配置化表格开发', isDone: false, deadline: '2025-01-01' }
  ]
};

const { reload, getTableProps, loading } = useTable({
  columns: columns,
  api: getTableDataApi
});

reload();

const handleLogout = () => {
  userStore.logout()
  router.push('/login');
}
</script>


<template>
  <div class="dashboard-container">
    <header>
      <h2>工作台 (Dashboard)</h2>
      <div class="user-info">
        <span>当前用户：{{ userStore.userInfo?.username }}权限:{{ userStore.userInfo?.roles[0] }}</span>
        <button @click="handleLogout" style="margin-left: 10px;">退出登陆</button>
      </div>
    </header>
    <hr style="margin: 20px 0;">
    <div class="action-bar">
      <button @click="reload" :disabled="loading">
        {{ loading ? '数据加载中...' : '刷新数据' }}
      </button>
    </div>
    <BasicTable v-bind="getTableProps"></BasicTable>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-bar {
  margin-bottom: 20px;
}
</style>