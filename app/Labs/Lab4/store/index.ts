import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "../ReduxExamples/HelloRedux/helloReducer";
import counterReducer from "../ReduxExamples/counterSlice";
import todoReducer from "../ReduxExamples/todoSlice";

const store = configureStore({
  reducer: { helloReducer, counter: counterReducer, todo: todoReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
