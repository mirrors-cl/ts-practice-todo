<script setup lang="ts">
  import { ref } from 'vue';
  import  type {TodoItem} from './types/todo'
  const todoList = ref<TodoItem[]>([])

  const handleAdd = (text:string) =>{
    const newItem:TodoItem = {
      id:Date.now().toString(),
      content:text,
      isDone:false
    }
    todoList.value.push(newItem)
  }
</script>

<template>
  <div class="app-container">
    <h1>TS Todo List</h1>
    <input type="text"  placeholder="先随便写写"/>
    <ul>
      <li v-for="item in todoList" :key="item.id">
        {{ item.content }}
      </li>
    </ul>
  </div>

</template>

<style scoped>
</style>
