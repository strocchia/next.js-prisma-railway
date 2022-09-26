import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { toggleTodo, deleteTodo, useTodos } from "../api";

const TodoItem = ({ todo }) => {
  return (
    <li className={styles.todo}>
      <label
        className={`${styles.label} ${todo.completed ? styles.checked : ""}`}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          className={`${styles.checkbox}`}
          onChange={() => toggleTodo(todo)}
        />
        {todo.text}
      </label>

      <button
        className={styles.deleteButton}
        onClick={() => deleteTodo(todo.id)}
      >
        ✕
      </button>
    </li>
  );
};

const TodoList = () => {
  const { data: todos, error } = useTodos();

  if (error) return <div>Error loading todos..., {error}</div>;

  if (!todos) return <div>Loading...</div>;

  if (todos.length === 0) {
    return <div className={styles.emptyState}>Try adding a todo ☝️️</div>;
  }

  if (todos.error) {
    // return <
  }

  return (
    <ul className={styles.todoList}>
      {todos && todos.map((todo, idx) => <TodoItem todo={todo} key={idx} />)}
    </ul>
  );
};

export default TodoList;
