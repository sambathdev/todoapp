import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Todo } from '@/models/todo';

const { getItem, setItem } = useLocalStorage('todos');

export const getTodosApi = async () => {
  await new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000);
  });
  return getItem();
};

export const createTodoApi = async (newTodo: Todo) => {
  await new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000);
  });
  const newTodos = [...getItem(), newTodo]
  setItem(newTodos);
  return newTodo;
};

export const editTodoApi = async (todoId: string, newTodo: Todo) => {
  await new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000);
  });
  const newTodos = getItem().map((todo: Todo) => {
    if (todo.id == todoId) return newTodo;
    return todo;
  });
  setItem(newTodos);
  return newTodo;
};

export const toggleCompleteTodoApi = async (todoId: string) => {
  await new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000);
  });
  const toUpdateTodo = getItem().find((todo: Todo) => todo.id == todoId);
  toUpdateTodo.isCompleted = !toUpdateTodo.isCompleted;
  const newTodos = getItem().map((todo: Todo) => {
    if (todo.id == todoId) return toUpdateTodo;
    return todo;
  });
  setItem(newTodos);
  return toUpdateTodo;
};

export const deleteTodoApi = async (todoId: string) => {
  await new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000);
  });
  const newTodos = getItem().filter((todo: Todo) => todo.id != todoId);
  setItem(newTodos);
  return todoId;
};
