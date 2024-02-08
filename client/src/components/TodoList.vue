<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Todo List</h1>
    <ul>
      <li v-for="todo in todos" :key="todo._id" class="mb-2">
        <input type="checkbox" v-model="todo.completed" @change="toggleCompletion(todo._id)">
        <span :class="{ 'line-through': todo.completed }">{{ todo.title }}</span>
        <button @click="deleteTodo(todo._id)" class="ml-4 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getTodos, deleteTodo, updateTodo } from '../services/api';

export default {
  name: 'TodoList',
  setup() {
    const todos = ref([]);

    const fetchTodos = async () => {
      try {
        todos.value = await getTodos();
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    const deleteTodoItem = async (id) => {
      try {
        await deleteTodo(id);
        todos.value = todos.value.filter(todo => todo._id !== id);
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    };

    const toggleCompletion = async (id) => {
      try {
        const todo = todos.value.find(todo => todo._id === id);
        todo.completed = !todo.completed;
        await updateTodo(id, { completed: todo.completed });
      } catch (error) {
        console.error('Error toggling todo completion:', error);
      }
    };

    onMounted(fetchTodos);

    return {
      todos,
      deleteTodo: deleteTodoItem,
      toggleCompletion
    };
  }
};
</script>
