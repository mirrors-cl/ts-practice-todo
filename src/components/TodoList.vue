<script setup lang="ts">
import type { TodoItem } from "../types/todo";

const props = defineProps<{
  list: TodoItem[];
  title?: string;
}>();

const emit = defineEmits<{
  toggle: [id: string],
  remove: [id: string]

}>();
</script>

<template>
  <div class="list-wrapper">
    <h3>{{ title || '默认标题' }}</h3>
    <ul>
      <li v-for="item in list" :key="item.id">
        <span :style="{ textDecoration: item.isDone ? 'line-through' : 'none' }">
          {{ item.content }}
        </span>
        <span v-if="item.deadline" style="color: red; margin-left: 10px; font-size: 12px;">
          (截止: {{ item.deadline }})
        </span>
        <button @click="emit('toggle', item.id)">完成</button>
        <button @click="emit('remove', item.id)">删除</button>
      </li>
    </ul>
  </div>
</template>