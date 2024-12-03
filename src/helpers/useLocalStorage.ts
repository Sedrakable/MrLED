"use client";
import { useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Initialize the state with the value from localStorage or the initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Setter function to update both state and localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore); // Update the state
      localStorage.setItem(key, JSON.stringify(valueToStore)); // Update localStorage
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
};
