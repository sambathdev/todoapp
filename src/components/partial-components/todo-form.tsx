import { memo, useState } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Todo } from '@/models/todo';
import { createTodoApi } from '@/services/todo';

interface TodoFormProps {
  setTodos: Function;
}

const TodoForm = ({ setTodos }: TodoFormProps) => {
  const [loading, setLoading] = useState(false);
  const [todoString, setTodoString] = useState('');
  
  const createNewTodo = () => {
    if (!todoString) {
      toast('Please title your Todo!');
      return;
    }

    const newTodo: Todo = {
      id: String(Math.random()),
      title: todoString,
      isCompleted: false,
      createdAt: new Date().toString(),
    };
    setLoading(true);
    createTodoApi(newTodo)
      .then((createdTodo: Todo) => {
        setTodos((prev: Todo[]) => [...prev, createdTodo]);
        setTodoString('');
        toast('A Todo Created!');
      })
      .catch((er) => {
        toast.error(`Fail to create new Todo! ${er.message}}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (loading) return;
      createNewTodo();
    }
  };

  return (
    <div id="form" className="flex gap-2 h-9">
      <Input
        disabled={loading}
        onChange={(e) => {
          setTodoString(e.target.value);
        }}
        value={todoString}
        type="text"
        placeholder="New Todo"
        onKeyDown={handleKeyDown}
      />

      <Button disabled={loading} size="sm" onClick={createNewTodo}>
        +
      </Button>
    </div>
  );
};

export default memo(TodoForm);
