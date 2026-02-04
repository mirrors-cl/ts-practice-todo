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


// ============ 🟢 新增：用户列表区域 ============

// 1. 定义新菜单 (表头)
const userColumns: BasicColumn[] = [
  { title: '用户ID', dataIndex: 'id', width: '80px' },
  { title: '姓名', dataIndex: 'username' },
  { title: '角色', dataIndex: 'role' }
]

// 2. 定义新供货商 (API)
// 模拟一个返回用户数据的接口
const getUserListApi = async () => {
  await new Promise(resolve => setTimeout(resolve, 800)); // 假装慢一点
  return [
    { id: '101', username: '张三', role: '管理员' },
    { id: '102', username: '李四', role: '普通用户' },
    { id: '103', username: '王五', role: '审计员' }
  ]
}

// 3. 调用 Hook (这一步就是复用的精髓！)
const {
  // 把 getTableProps 重命名为 userTableProps
  getTableProps: userTableProps,
  // 把 reload 重命名为 reloadUsers (避免和上面的 reload 冲突)
  reload: reloadUsers,
  // 把 loading 重命名为 userLoading
  loading: userLoading
} = useTable({
  columns: userColumns,   // 传入新菜单
  api: getUserListApi     // 传入新供货商
});

// 4. 让它自动加载
reloadUsers();
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
    <!-- 自定义指令 -->
    <div class="permission-test" style="margin: 20px 0; padding: 10px; border: 1px dashed orange;">
      <h3>权限指令测试实验室</h3>
      <button>👀 所有人可见</button>
      <button v-auth="'user'" style="background: green; color: white; margin-left: 10px;">
        👶 普通用户专属
      </button>
      <button v-auth="'admin'" style="background: red; color: white; margin-left: 10px;">
        👮‍♀️ 管理员专属 (删除库跑路)
      </button>
    </div>
    <!-- 新增的复用逻辑 -->
    <hr style="margin: 40px 0; border-top: 2px dashed #ccc;" />

    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h2>用户管理 (User List)</h2>
      <button @click="reloadUsers" :disabled="userLoading">
        {{ userLoading ? '读取中...' : '刷新用户' }}
      </button>
    </div>

    <BasicTable v-bind="userTableProps"></BasicTable>
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