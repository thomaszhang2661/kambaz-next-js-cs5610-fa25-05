"use client";
import { Provider } from "react-redux";
import store from "../store";
import CounterRedux from "./CounterRedux";
import TodoListRedux from "./TodoListRedux";

export default function ReduxExamples() {
  return (
    <Provider store={store}>
      <div>
        <h2>Redux Examples</h2>
        <p>These examples demonstrate simple Redux wiring for the chapter.</p>
        <CounterRedux />
        <TodoListRedux />
        <hr />
      </div>
    </Provider>
  );
}
