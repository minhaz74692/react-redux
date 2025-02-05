import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  success,
  failed,
  incrementByPayload,
  reset,
} from "../redux/slices/statusSlice";
const Status = () => {
  const status = useSelector((state) => state.status.value);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>The Status: {status}</h1>
      <button onClick={() => dispatch(success())}>Success</button>
      <button onClick={() => dispatch(failed())}>Failed</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <button onClick={() => dispatch(incrementByPayload("Hello World"))}>
        Print Hello
      </button>
    </div>
  );
};
export default Status;
