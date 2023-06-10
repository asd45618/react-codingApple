import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    increaseAge(state, action) {
      state.age += action.payload;
    },
  },
});

export let { increaseAge } = user.actions;

export default user;
