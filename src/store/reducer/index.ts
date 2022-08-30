import { combineReducers } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import electronSlice from "./electronSlice";

export const reducer = combineReducers({
  counter: counterSlice,
  electron: electronSlice
})
