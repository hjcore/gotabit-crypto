import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  count: number;
}

export const initialCountState: CounterState = {
  count: 0
}

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCountState,
  reducers: {
    setCountValue: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    increase: (state) => {
      state.count = state.count + 1;
    },
    decrease: (state) => {
      state.count = state.count - 1;
    }
  }
})

export const { setCountValue, increase, decrease } = counterSlice.actions;

export default counterSlice.reducer;