import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../models/Todo";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";

interface Props {
  index: number;
  todo: Todo;
  key: number;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({
  index,
  todo,
  key,
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (t: Todo) => {
    t.isDone = true;

    let isAlreadyCompleted = false;

    completedTodos.forEach((todo) => {
      if (t.id === todo.id) {
        isAlreadyCompleted = true;
      }
    });

    if (!isAlreadyCompleted) {
      setCompletedTodos([...completedTodos, t]);
    }

    setTodos([...todos.filter((todo) => t.id !== todo.id)]);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  function handleEdit(e: React.FormEvent<HTMLFormElement>, id: number): void {
    //Not to refresh the page
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  }

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div>
        {!todo.isDone && (
          <span
            className="icon"
            onClick={() => {
              if (!edit && !todo.isDone) {
                setEdit(!edit);
              }
            }}
          >
            <AiFillEdit />
          </span>
        )}
        {!todo.isDone && (
          <span className="icon" onClick={() => handleDelete(todo.id)}>
            <AiFillDelete />
          </span>
        )}
        {!todo.isDone && (
          <span
            className="icon"
            onClick={() => {
              handleDone(todo);
            }}
          >
            <MdDone />
          </span>
        )}
      </div>
    </form>
  );
};

export default SingleTodo;
