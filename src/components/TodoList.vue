<script setup lang="ts">
  import  type  { TodoItem } from  "../types/todo";

  const props = defineProps<{
    list:TodoItem[];
    title?:string;
  }>();

  const emit = defineEmits<{
    toggle:[id:string],
    remove:[id:string]

  }>();
</script>

<template>
  <div class="list-wrapper">
    <h3>{{ title || '默认标题' }}</h3>
    <ul>
      <li v-for="item in list" :key="item.id"></li>
      <span :style="{textDecoration:item.isDone ?'line-through':'none'}">
        {{ item.content }}
      </span>
    </ul>

  </div>
</template>