<!-- client/src/App.vue -->
<template>
  <div id="app" class="container mx-auto p-4">
    <AddTodo />
    <TodoList />
  </div>
</template>

<script>
import AddTodo from './components/AddTodo.vue';
import TodoList from './components/TodoList.vue';

export default {
  name: 'App',
  components: {
    AddTodo,
    TodoList
  }
};
</script>

<style>
/* Add global styles if needed */
</style>
