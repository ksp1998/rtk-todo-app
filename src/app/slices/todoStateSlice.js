import { createSlice } from "@reduxjs/toolkit";

const initialTodoState = {
  todoState: new URLSearchParams(window.location.search).get("todos") ?? "",
};

export const todoStateSlice = createSlice({
  name: "todoState",
  initialState: initialTodoState,
  reducers: {
    updateTodoState: (state, action) => {
      state.todoState = action.payload;
    },
  },
});

export const { updateTodoState } = todoStateSlice.actions;

// To aware store about the reducers as store is restrictive and only register reducers will be maintained by store!
export default todoStateSlice.reducer;
