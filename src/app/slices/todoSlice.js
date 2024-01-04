import { createSlice, nanoid } from "@reduxjs/toolkit";

// Initial state of todos...
const initialTodos = {
  todos: (() => {
    try {
      return JSON.parse(localStorage.getItem("todos") ?? "[]");
    } catch (error) {
      return [];
    }
  })(), // IIFE
};

// Creating a todos slice
export const todoSlice = createSlice({
  name: "todo",
  initialState: initialTodos,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: nanoid(),
        name: action.payload,
        completed: false,
        createdAt: Date.now(),
      });
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          todo = action.payload;
        }
        return todo;
      });
    },
    toggleTodoState: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    clearCompletedTodos: (state, action) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
  },
});

export const {
  addTodo,
  updateTodo,
  removeTodo,
  toggleTodoState,
  clearCompletedTodos,
} = todoSlice.actions;

// To aware store about the reducers as store is restrictive and only register reducers will be maintained by store!
export default todoSlice.reducer;
