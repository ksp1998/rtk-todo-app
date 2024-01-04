import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeTodo,
  toggleTodoState,
  updateTodo,
} from "../app/slices/todoSlice";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setTodoText] = useState(todo.name);

  const handleEditTodo = (id) => {
    setIsEditing(true);
    setTimeout(() => {
      document.querySelector(`#id-${id}`)?.focus();
    }, 100);
  };

  const handleTodoUpdate = (id) => {
    if (!todoText.trim() || todoText === todo.name) {
      // Show error if required
      setTodoText(todo.name);
      setIsEditing(false);
      return;
    }

    const updatedTodo = {
      ...todo,
      name: todoText,
    };

    dispatch(updateTodo(updatedTodo));
    setIsEditing(false);
  };

  return (
    <li
      className={`todo-item ${todo.completed ? "completed" : ""} ${
        isEditing ? "editing" : ""
      }`}
    >
      <label onClick={() => dispatch(toggleTodoState(todo.id))}>
        <span className="btn-checkbox"></span>
        {!isEditing && <span className="todo-text">{todo.name}</span>}
      </label>

      <span className="created-at">
        Created on {new Date(todo.createdAt).toLocaleString("en-IN")}
      </span>

      {isEditing && (
        <form
          onSubmit={(form) => {
            form.preventDefault();
            handleTodoUpdate(todo.id);
          }}
        >
          <input
            id={`id-${todo.id}`}
            type="text"
            className="update-todo"
            placeholder={todo.name}
            value={todoText}
            onChange={(input) => setTodoText(input.target.value)}
          />
        </form>
      )}

      <span className="spacer"></span>

      {!isEditing && (
        <span
          className="todo-btn btn-edit-todo"
          onClick={() => handleEditTodo(todo.id)}
        ></span>
      )}

      {isEditing && (
        <span
          className="todo-btn btn-update-todo"
          onClick={() => handleTodoUpdate(todo.id)}
        ></span>
      )}

      <span
        className="todo-btn btn-delete-todo"
        onClick={() => dispatch(removeTodo(todo.id))}
      ></span>
    </li>
  );
};

export default TodoItem;
