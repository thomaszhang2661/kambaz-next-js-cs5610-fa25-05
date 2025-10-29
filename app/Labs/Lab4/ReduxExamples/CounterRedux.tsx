"use client";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { increment, decrement } from "./counterSlice";

export default function CounterRedux() {
  const value = useSelector((state: RootState) => state.counter?.value ?? 0);
  const dispatch = useDispatch();
  return (
    <div id="wd-counter-redux">
      <h2>Counter Redux</h2>
      <h3>{value}</h3>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => dispatch(increment())}
          id="wd-counter-redux-increment"
          className="btn btn-success"
          aria-label="increment"
          data-testid="counter-increment"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(decrement())}
          id="wd-counter-redux-decrement"
          className="btn btn-danger"
          aria-label="decrement"
          data-testid="counter-decrement"
        >
          Decrement
        </button>
      </div>
      <hr />
    </div>
  );
}
