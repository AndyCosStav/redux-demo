import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
        console.log(state, action );
      const {text, dueDate, user} = action.payload;
      state.push({ id: Date.now(), text, completed: false, dueDate, user});
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, newText, newDueDate} = action.payload;
      const todo = state.find((t) => t.id === id);
      if (todo) {
        todo.text = newText;
        todo.dueDate = newDueDate;
      }
    },
    toggleComplete: (state, action) => {
        console.log(state, action);
      const todo = state.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
  },
});

export const { addTodo, deleteTodo, editTodo, toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;
