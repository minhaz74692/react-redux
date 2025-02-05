import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: "None",
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    success: (state) => {
      state.value = "Success";
    },
    failed: (state) => {
      state.value = "Failed";
    },
    incrementByPayload: (state, action) => {
      state.value = action.payload;
    },
    reset: () => initialState,
  },
});

export const { success, failed, incrementByPayload, reset } =
  statusSlice.actions;
export default statusSlice.reducer;
