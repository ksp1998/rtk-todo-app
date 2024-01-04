import "./App.scss";
import { NewTodo, TodoContainer, TodoFooter, TodoHeader } from "./components";

function App() {
  return (
    <div className="container app-container">
      <TodoHeader />
      <NewTodo />
      <TodoContainer />
      <TodoFooter />
    </div>
  );
}

export default App;
