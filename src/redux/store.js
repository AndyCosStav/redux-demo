import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

const loadFromLocalStorage = () => {
  try {
    const serialized = localStorage.getItem('todos');
    return serialized ? JSON.parse(serialized) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serialized = JSON.stringify(state.todos);
    localStorage.setItem('todos', serialized);
  } catch {
    console.log('error!');
  }
};

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState: {
    todos: loadFromLocalStorage(),
  },
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});
