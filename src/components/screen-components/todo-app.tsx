import React, { useEffect, useMemo, useState } from 'react';
import TodoBlock from '../partial-components/todo';
import TodoForm from '../partial-components/todo-form';
import TodoFilter from '../partial-components/todo-filter';
import { Todo } from '@/models/todo';
import { TodoFilters } from '@/models/todo-filters';
import { getTodosApi } from '@/services/todo';
import { toast } from 'sonner';

interface TodoListAppProps {}

const TodoListApp = ({}: TodoListAppProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<TodoFilters>({
    isCompleted: null,
    search: '',
    sortBy: 'date',
    sortType: 'asc',
  });

  useEffect(() => {
    setLoading(true);
    getTodosApi()
      .then((data) => {
        setTodos(data);
      })
      .catch((er) => {
        toast.error(`Fail to get todos ${er.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const displayTodos = useMemo(() => {
    let filteredTodos = todos;

    if (filters.isCompleted != null) {
      filteredTodos = filteredTodos.filter((todo) => {
        return todo.isCompleted == filters.isCompleted;
      });
    }

    if (filters.search) {
      filteredTodos = filteredTodos.filter((todo) => {
        return todo.title.includes(filters.search);
      });
    }

    if (filters.sortBy == 'alphabet') {
      filteredTodos = filteredTodos.sort((a, b) => {
        return filters.sortType == 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      });
    }

    if (filters.sortBy == 'date') {
      filteredTodos = filteredTodos.sort((a, b) => {
        return filters.sortType == 'asc'
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
    }
    return filteredTodos;
  }, [todos, filters]);

  return (
    <div
      className=" flex justify-center items-center py-4 bg-red-300 px-2"
      style={{ minHeight: '100vh' }}
    >
      <div className="bg-slate-100 flex flex-col p-4 rounded-lg shadow-md">
        <h1 className="font-bold text-xl mb-4">TODO APP</h1>
        <TodoForm setTodos={setTodos} />
        <TodoFilter filters={filters} setFilters={setFilters} />
        {loading && (
          <div className="flex items-center justify-center">Loading ...</div>
        )}
        {todos.length == 0 && !loading && (
          <div className="flex items-center justify-center text-slate-600">
            Todo is Empty.
          </div>
        )}
        <div>
          {displayTodos.map((todo) => (
            <React.Fragment key={todo.id}>
              <TodoBlock todo={todo} setTodos={setTodos} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoListApp;
