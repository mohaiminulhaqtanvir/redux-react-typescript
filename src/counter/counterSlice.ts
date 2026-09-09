import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",

  initialState: {
    count: 0,
    value: 10,
  },

  reducers: {
    increment: (state) => {
      state.count += 1;
    },

    decrement: (state) => {
      state.count -= 1;
    },

    reset: (state) => {
      state.count = 0;
    },

    setValue: (state, actions) => {
      state.value = actions?.payload.value;
    },
  },
});

export const { increment, decrement, reset, setValue } = counterSlice.actions;

export default counterSlice.reducer;
