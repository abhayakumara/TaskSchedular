import React from "react";
import "./styles.css";
import { Todo } from "../models/Todo";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <div className="container">
      <div className="todos">
        <span className="todos__heading">Active Tasks</span>
        {todos.map((todo, index) => (
          <SingleTodo
            index={index}
            todo={todo}
            key={todo.id}
            todos={todos}
            setTodos={setTodos}
            completedTodos={completedTodos}
            setCompletedTodos={setCompletedTodos}
          />
        ))}
      </div>
      <div className="todos remove">
        <span className="todos__heading">Completed Tasks</span>
        {completedTodos.map((todo, index) => (
          <SingleTodo
            index={index}
            todo={todo}
            key={todo.id}
            todos={todos}
            setTodos={setTodos}
            completedTodos={completedTodos}
            setCompletedTodos={setCompletedTodos}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
