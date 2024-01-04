import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../app/slices/todoSlice";

const NewTodo = () => {
  const [todoText, setTodoText] = useState("");

  const dispatch = useDispatch();

  const handleFormSubmit = (form) => {
    form.preventDefault();
    if (!todoText.trim()) {
      // Show error if required
      return;
    }

    dispatch(addTodo(todoText));
    setTodoText("");
  };

  return (
    <form className="new-todo" onSubmit={handleFormSubmit}>
      <input
        type="text"
        id="new-todo"
        placeholder="Create new todo..."
        value={todoText}
        onChange={(input) => setTodoText(input.target.value)}
      />
      <button id="btn-add-todo" className="todo-btn"></button>
    </form>
  );
};

export default NewTodo;
