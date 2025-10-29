import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = { id: string; text: string; completed?: boolean };

type TodoState = { todos: Todo[] };

const makeId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

const initialState: TodoState = {
  todos: [
    { id: makeId(), text: "Learn React", completed: false },
    { id: makeId(), text: "Learn Node", completed: false },
  ],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.todos.push({
        id: makeId(),
        text: action.payload,
        completed: false,
      });
    },
    updateTodo(state, action: PayloadAction<{ id: string; text: string }>) {
      const { id, text } = action.payload;
      const t = state.todos.find((x) => x.id === id);
      if (t) t.text = text;
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    toggleTodo(state, action: PayloadAction<string>) {
      const t = state.todos.find((x) => x.id === action.payload);
      if (t) t.completed = !t.completed;
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, toggleTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
