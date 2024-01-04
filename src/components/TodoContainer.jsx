import { useEffect } from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const TodoContainer = () => {
  const todoState = useSelector((state) => state.todoStateReducer.todoState);
  const todos = useSelector((state) => state.todoReducer.todos);

  const state = useSelector((state) => JSON.stringify(state));

  useEffect(() => {
    // Update local todos as well when todos in redux's store is updated
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-container">
      <ul className="todo-items">
        {todos
          ?.filter((todo) => {
            if (todoState === "active") {
              return !todo.completed;
            }
            if (todoState === "completed") {
              return todo.completed;
            }
            return true;
          })
          .map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
      </ul>
    </div>
  );
};

export default TodoContainer;
