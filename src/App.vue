<script setup lang="ts">
import { ref } from 'vue';
import type { TodoItem, AddTodoPayload } from './types/todo'

import TodoList from './components/TodoList.vue'
import TodoInput from "./components/TodoInput.vue";
// 定义一个 todoList 的响应式数据
const todoList = ref<TodoItem[]>([
  { id: '1', content: '学习 TS 泛型', isDone: false,deadline:'2024-12-12' },
  { id: '2', content: '重构简历', isDone: true,deadline:'2024-11-11' },
])

// 处理添加待办事项的函数
const handleAdd = (payload: AddTodoPayload) => {
  // 创建一个新的待办事项对象
  const newItem: TodoItem = {
    id: Date.now().toString(), // 使用时间戳作为唯一 ID
    content: payload.content, // 待办事项内容
    deadline: payload.date || undefined,
    isDone: false // 默认未完成
  }
  // 将新的待办事项添加到 todoList 中
  todoList.value.push(newItem)
}
// 处理删除待办事项的函数
const handleRemove = (id: string) => {
  // 通过过滤掉指定 ID 的待办事项来实现删除
  todoList.value = todoList.value.filter(item => item.id !== id)
}
// 处理切换待办事项完成状态的函数
const handleToggle = (id: string) => {
  // 切换指定 ID 待办事项的完成状态
  const target = todoList.value.find(item => item.id === id)
  if (target) {
    target.isDone = !target.isDone
  }
}
</script>

<template>
  <div class="app-container">
    <h1>TS Todo List</h1>
    <TodoInput @add="handleAdd" />
    <TodoList 
    :list="todoList"
    title="我的待办事项"
    @remove="handleRemove"
    @toggle="handleToggle"
    ></TodoList>
  </div>

</template>

<style scoped></style>
