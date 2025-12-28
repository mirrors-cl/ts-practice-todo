<script setup lang="ts">
import { ref } from 'vue';


  // const emit = defineEmits<{
  //   (e:'add',value:string):void;
  //   (e: 'clear'):void;
  // }>()
  // vue3.3+ 的写法
  const emit = defineEmits<{
    add: [value:string],
    clear:[]
  }>();
	const inputValue = ref('')

	const onEnter = () =>{
		if (!inputValue.value) return;
		
		emit('add',inputValue.value)

		inputValue.value = ''
	}
</script>
<template>
	<input v-model="inputValue" @keyup.enter="onEnter" placeholder="输入后回车...">
</template>