import React, { useState } from "react";
import "./App.css";
import InputFiled from "./components/InputFiled";
import { Todo } from "./models/Todo";
import TodoList from "./components/TodoList";
import "./components/styles.css";

function App() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };

  return (
    <div className="App">
      <span className="heading">Task Schedular</span>
      <InputFiled todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        completedTodos={completedTodos}
        setCompletedTodos={setCompletedTodos}
      />
      <button
        className="clear"
        type="button"
        onClick={() => setCompletedTodos([])}
      >
        Clear
      </button>
    </div>
  );
}

export default App;
