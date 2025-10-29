"use client";
import { useSelector } from "react-redux";

export default function HelloReduxComponent() {
  const message = useSelector(
    (state: { helloReducer?: { message?: string } }) =>
      state.helloReducer?.message ?? ""
  );
  return (
    <div id="wd-hello-redux">
      <h3>Hello Redux</h3>
      <h4>{message}</h4>
      <hr />
    </div>
  );
}
