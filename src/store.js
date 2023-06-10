import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    increaseCount(state, action) {
      let num = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[num].count++;
    },
    addItem(state, action) {
      let num = state.findIndex((a) => {
        return a.id === action.payload.id;
      });
      let naming = state.findIndex((a) => {
        return a.name === action.payload.name;
      });
      naming === -1 ? state.push(action.payload) : state[num].count++;
    },
    deleteItem(state, action) {
      state.splice(action.payload, 1);
    },
  },
});

export let { increaseCount, addItem, deleteItem } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
