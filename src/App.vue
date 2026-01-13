<script setup lang="ts">
import { loginApi } from './api/user';
import { useUserStore } from './store/user';
// import type { TodoItem, AddTodoPayload } from './types/todo'
// import TodoList from './components/TodoList.vue'
// import TodoInput from "./components/TodoInput.vue";

//new
import BasicTable from "./components/BasicTable.vue";
import { useTable } from "./hooks/useTable";
import type { BasicColumn } from "./components/BasicTable.vue";

// // 定义一个 todoList 的响应式数据
// const todoList = ref<TodoItem[]>([
//   { id: '1', content: '学习 TS 泛型', isDone: false,deadline:'2024-12-12' },
//   { id: '2', content: '重构简历', isDone: true,deadline:'2024-11-11' },
// ])
// 测试pinia
const userStore = useUserStore();

const testloginpinia = async () => {
  console.log('开始登录pinia...');
  await userStore.login('admin');
  console.log('登录pinia完成，用户信息:', userStore.userInfo);
}
// new      
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

// // 处理添加待办事项的函数
// const handleAdd = (payload: AddTodoPayload) => {
//   // 创建一个新的待办事项对象
//   const newItem: TodoItem = {
//     id: Date.now().toString(), // 使用时间戳作为唯一 ID
//     content: payload.content, // 待办事项内容
//     deadline: payload.date || undefined,
//     isDone: false // 默认未完成
//   }
//   // 将新的待办事项添加到 todoList 中
//   todoList.value.push(newItem)
// }
// // 处理删除待办事项的函数
// const handleRemove = (id: string) => {
//   // 通过过滤掉指定 ID 的待办事项来实现删除
//   todoList.value = todoList.value.filter(item => item.id !== id)
// }
// // 处理切换待办事项完成状态的函数
// const handleToggle = (id: string) => {
//   // 切换指定 ID 待办事项的完成状态
//   const target = todoList.value.find(item => item.id === id)
//   if (target) {
//     target.isDone = !target.isDone
//   }
// }

const testApi = async () => {
  try {
    // 发送登录请求
    console.log('正在发送请求...');
    const res = await loginApi({ account: 'admin', password: '123' })
    console.log('登录成功', res.result.token);
    alert('Axios 封装测试通过！Token: ' + res.result.token);
  } catch (error) {
    console.log('登录失败', error);
  }
}

</script>

<template>
  <div class="app-container">
    <h1>TS 配置化表格演示</h1>
    <!-- 加个按钮来触发测试 -->
    <div style="margin-bottom: 20px;">
      <button @click="testApi" style="background-color: #42b983; color: white;">
        测试 Axios 封装
      </button>
      <button @click="testloginpinia">登录测试</button>
      <h1 v-if="userStore.userInfo">
       当前用户 {{ userStore.userInfo?.username }}
       当前角色：{{ userStore.userInfo?.roles[0] }}</h1>
      <!-- 表格刷新按钮 -->
      <button @click="reload" :disabled="loading">
        {{ loading ? '加载中...' : '刷新表格数据' }}
      </button>
    </div>
    <hr style="margin: 20px 0;" />
    <BasicTable v-bind="getTableProps"></BasicTable>
    <!-- <TodoInput @add="handleAdd" />
    <TodoList :list="todoList" title="我的待办事项" @remove="handleRemove" @toggle="handleToggle"></TodoList> -->
  </div>

</template>

<style scoped></style>
