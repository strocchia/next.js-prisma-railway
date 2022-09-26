import useSWR, { mutate } from "swr";
// import { Todo } from "./types";

const todoPath = "/api/todos";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetcher = async (uri) => {
  const res = await fetch(uri);
  return await res.json();
};

export const useTodos = () => useSWR(todoPath, fetcher);

export const createTodo = async (text) => {
  const newTodo = {
    id: "new-todo",
    text,
    completed: false,
  };

  // optimistically create todo
  mutate(todoPath, (existing) => [newTodo, ...existing], false);

  await fetch(todoPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  mutate(todoPath);
};

export const toggleTodo = async (todo) => {
  // optimistically toggle completion
  mutate(
    todoPath,
    (existing) =>
      existing.map((item) =>
        item.id === todo.id ? { ...item, completed: !item.completed } : item
      ),
    false
  );

  await fetch(`${todoPath}?upd=${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed: !todo.completed }),
  });

  mutate(todoPath);
};

export const deleteTodo = async (id) => {
  // optimistically delete todo
  mutate(todoPath, (todos) => todos.filter((todo) => todo.id !== id), false);

  await fetch(`${todoPath}?del=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  mutate(todoPath);
};
