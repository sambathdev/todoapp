import { Separator } from '@/components/ui/separator';
import { memo, useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '../ui/input';
import { SortBy, TodoFilters, sortType } from '@/models/todo-filters';

interface TodoFilterProps {
  filters: TodoFilters;
  setFilters: React.Dispatch<React.SetStateAction<TodoFilters>>;
}

const TodoFilter = ({ filters, setFilters }: TodoFilterProps) => {
  const [keyword, setKeyword] = useState('');
  const { debounceValue } = useDebounce(keyword, 500);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: debounceValue }));
  }, [debounceValue]);

  return (
    <div>
      <div className="flex flex-wrap items-center space-x-4 text-sm my-4">
        <button
          onClick={() => setFilters((prev) => ({ ...prev, isCompleted: null }))}
          className={
            filters.isCompleted === null ? 'text-blue-400 underline' : ''
          }
        >
          All
        </button>
        <Separator orientation="vertical" />
        <button
          onClick={() =>
            setFilters((prev) => ({ ...prev, isCompleted: false }))
          }
          className={
            filters.isCompleted === false ? 'text-blue-400 underline' : ''
          }
        >
          Pending
        </button>
        <Separator orientation="vertical" />
        <button
          onClick={() => setFilters((prev) => ({ ...prev, isCompleted: true }))}
          className={
            filters.isCompleted === true ? 'text-blue-400 underline' : ''
          }
        >
          Completed
        </button>
      </div>
      <div className="flex flex-wrap">
        <div className="flex gap-2 items-center mr-2  mb-4">
          <Input
            type="text"
            placeholder="Search Keyword"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-2  mb-4">
          <Select
            defaultValue="date"
            onValueChange={(value: SortBy) => {
              setFilters((prev) => ({ ...prev, sortBy: value }));
            }}
          >
            <SelectTrigger className="w-[180px]">
              Sort By: <SelectValue placeholder="Created Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alphabet">Aphabet</SelectItem>
              <SelectItem value="date">Created Date</SelectItem>
            </SelectContent>
          </Select>

          <Select
            defaultValue="asc"
            onValueChange={(value: sortType) => {
              setFilters((prev) => ({ ...prev, sortType: value }));
            }}
          >
            <SelectTrigger className="w-[180px]">
              Sort Type: <SelectValue placeholder="Asc" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Asc</SelectItem>
              <SelectItem value="desc">Desc</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default memo(TodoFilter);
