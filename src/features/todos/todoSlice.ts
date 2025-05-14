import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
  deadline?: string;
  completedAt?: string;
}

const initialState: ITodo[] = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string; deadline?: string }>) => {
      state.push({
        id: Date.now(),
        text: action.payload.text,
        completed: false,
        deadline: action.payload.deadline,
      });
    },
    toggleComplete: (state, action: PayloadAction<number>) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ? new Date().toISOString() : undefined;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;