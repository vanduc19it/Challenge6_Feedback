// localStorage.ts
import { Middleware } from "redux";

export const localStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);
    const allStates = store.getState();
    Object.keys(allStates).forEach((reducerName) => {
      localStorage.setItem(reducerName, JSON.stringify(allStates[reducerName]));
    });

    return result;
  };

export const getDataFromLocalStorage = (name: string) => {
  const storedData = localStorage.getItem(name);

  if (storedData) {
    return JSON.parse(storedData);
  }

  return null;
};

export const setLocalStorageItem = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setItem localstorage:", error);
  }
};
