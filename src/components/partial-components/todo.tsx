import { memo, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  deleteTodoApi,
  editTodoApi,
  toggleCompleteTodoApi,
} from '@/services/todo';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Todo } from '@/models/todo';
import { dateFormat } from '@/constants/date-format';

interface TodoBlockProps {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoBlock = ({ todo, setTodos }: TodoBlockProps) => {
  const [temptTodoEdit, setTemptTodoEdit] = useState('');
  const [loading, setLoading] = useState(false);

  const closeRef = useRef(null);
  const todoCreatedAtFormated = new Date(todo.createdAt).toLocaleString(
    'en-US',
    dateFormat
  );

  const deleteTodo = () => {
    setLoading(true);
    deleteTodoApi(todo.id)
      .then((deletedTodoId) => {
        setTodos((prev: Todo[]) =>
          prev.filter((todO: Todo) => {
            return todO.id != deletedTodoId;
          })
        );
        toast('Todo Deleted!');
      })
      .catch((er) => {
        toast.error(`Todo Deleted Fail! ${er.message}}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const editTodo = () => {
    if (!temptTodoEdit) {
      (closeRef?.current as any).click();
      return;
    }
    setLoading(true);
    editTodoApi(todo.id, {
      ...todo,
      title: temptTodoEdit,
    })
      .then((updatedTodo) => {
        setTodos((prev: Todo[]) =>
          prev.map((todO: Todo) => {
            if (todO.id == todo.id) return updatedTodo;
            return todO;
          })
        );
        toast('Todo Edited!');
      })
      .catch((er) => {
        toast.error(`Fail to edit Todo! ${er.message}}`);
      })
      .finally(() => {
        setLoading(false);
        (closeRef?.current as any).click();
      });
  };

  const toggleCheckCompleteChange = (value: CheckedState) => {
    setLoading(true);
    toggleCompleteTodoApi(todo.id)
      .then((updatedTodo) => {
        setTodos((prev: Todo[]) =>
          prev.map((todO: Todo) => {
            if (todO.id == todo.id) return updatedTodo;
            return todO;
          })
        );
        toast(`Todo Moved to ${Boolean(value) ? 'Completed' : 'Pending'}!`);
      })
      .catch((er) => {
        toast.error(`Fail to Update Todo! ${er.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (loading) return;
      editTodo();
    }
  };

  return (
    <div className="bg-slate-200 rounded-md p-2 my-1 flex justify-between items-center relative">
      <div className="flex items-center gap-2">
        <Checkbox
          disabled={loading}
          onCheckedChange={toggleCheckCompleteChange}
          checked={todo.isCompleted}
        />
        <p className={`${todo.isCompleted ? 'line-through' : ''}`}>
          {todo.title}
        </p>
      </div>
      <span className="absolute top-1 text-slate-500 w-full text-xs">
        {todoCreatedAtFormated}
      </span>
      <div className="flex">
        <Button
          disabled={loading}
          className="mr-2"
          variant="secondary"
          onClick={deleteTodo}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </Button>

        <Dialog>
          <DialogTrigger disabled={loading} className="flex items-stretch">
            <div className="bg-slate-100 py-2 px-4 rounded-md flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Todo</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Make changes to your todo here. Click save when you're done.
            </DialogDescription>
            <Input
              defaultValue={todo.title}
              onChange={(e) => {
                setTemptTodoEdit(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />

            <div className="flex gap-2">
              <Button className="w-full" onClick={editTodo} disabled={loading}>
                Save
              </Button>

              <DialogClose asChild>
                <Button
                  variant="destructive"
                  className="w-full"
                  ref={closeRef}
                  onClick={() => {
                    setTemptTodoEdit('');
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default memo(TodoBlock);
