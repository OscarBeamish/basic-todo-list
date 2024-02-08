<!-- client/src/components/AddTodo.vue -->
<template>
    <div class="mb-4">
      <input v-model="title" type="text" placeholder="Enter todo title..." class="border rounded px-2 py-1 mr-2">
      <button @click="addTodo" class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">Add Todo</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { addTodo } from '../services/api';
  
  export default {
    name: 'AddTodo',
    setup() {
      const title = ref('');
  
      const addNewTodo = async () => {
        if (!title.value.trim()) return;
        try {
          await addTodo(title.value.trim());
          title.value = '';
        } catch (error) {
          console.error('Error adding todo:', error);
        }
      };
  
      return {
        title,
        addTodo: addNewTodo
      };
    }
  };
  </script>
  