import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);

  return { debounceValue, setDebounceValue };
};
