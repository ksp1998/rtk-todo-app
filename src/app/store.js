import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import todoStateReducer from "./slices/todoStateSlice";

const rootReducer = combineReducers({
  todoReducer,
  todoStateReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
