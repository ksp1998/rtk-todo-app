import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCompletedTodos } from "../app/slices/todoSlice";
import { updateTodoState } from "../app/slices/todoStateSlice";

const TodoFooter = () => {
  const todoState = useSelector((state) => state.todoStateReducer.todoState);
  const todos = useSelector((state) => state.todoReducer.todos);
  const dispatch = useDispatch();

  const replaceTodosState = (e) => {
    e.preventDefault();
    const state = new URLSearchParams(e.target?.getAttribute("href")).get(
      "todos"
    );

    dispatch(updateTodoState(state));
  };

  useEffect(() => {
    const replaceState = todoState ? `?todos=${todoState}` : "/";
    window.history.replaceState(null, "", replaceState);
  }, [todoState]);

  return (
    <div className="todo-footer">
      <p className="itmes-left">
        {`${
          todos && todos?.length > 0
            ? todos?.filter((todo) => !todo.completed).length
            : "No"
        } items left!`}
      </p>
      <nav className="todo-states">
        <a
          href="/"
          className={`todo-state ${
            !todoState || !["active", "completed"].includes(todoState)
              ? "active"
              : ""
          }`}
          onClick={replaceTodosState}
        >
          All
        </a>
        <a
          href="?todos=active"
          className={`todo-state ${todoState === "active" ? "active" : ""}`}
          onClick={replaceTodosState}
        >
          Active
        </a>
        <a
          href="?todos=completed"
          className={`todo-state ${todoState === "completed" ? "active" : ""}`}
          onClick={replaceTodosState}
        >
          Completed
        </a>
      </nav>
      <button
        id="btn-clear-completed"
        onClick={() => dispatch(clearCompletedTodos())}
      >
        Clear Completed
      </button>
    </div>
  );
};

export default TodoFooter;
