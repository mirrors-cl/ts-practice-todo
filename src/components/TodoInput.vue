<script setup lang="ts">
import { ref } from 'vue';

  // 旧版本 vue3.2 的写法
  // const emit = defineEmits<{
  //   (e:'add',value:string):void;
  //   (e: 'clear'):void;
  // }>()

  // vue3.3+ 的写法
  // 定义组件的自定义事件
  const emit = defineEmits<{
    add: [value:string], // 定义一个添加事件，传递字符串值
    clear:[] // 定义一个清除事件，不传递值
  }>();
  // 定义一个响应式的输入框绑定值
	const inputValue = ref('')
  // 处理回车添加待办事项的函数
	const onEnter = () =>{
    // 如果输入框为空则不处理
		if (!inputValue.value) return;
		// 触发添加事件并传递输入框的值
		emit('add',inputValue.value)
    // 清空输入框
		inputValue.value = ''
	}
</script>
<template>
  <!--  输入框，绑定输入值并监听回车事件 -->
	<input v-model="inputValue" @keyup.enter="onEnter" placeholder="输入后回车...">
</template>