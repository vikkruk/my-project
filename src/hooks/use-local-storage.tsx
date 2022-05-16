import { useState, useEffect } from 'react';

type UseLocalStorage = <T>(value: string, defaultValue: T) => [T, (newValue:T) => void] ;

const useLocalStorage: UseLocalStorage = (name, defaultValue) => {
  const [value, setValue] = useState(() => {
    const existingValue = localStorage.getItem(name);
    if (existingValue) {
      return JSON.parse(existingValue);
    }
    return defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
