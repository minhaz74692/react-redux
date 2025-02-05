import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice"; // Example reducer
import statusReducer from "./slices/statusSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer, // Add reducers here
    status: statusReducer,
  },
});
export default store;
