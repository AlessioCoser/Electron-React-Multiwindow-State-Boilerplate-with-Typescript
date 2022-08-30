import { configureStore } from "@reduxjs/toolkit";
import { reducer } from '../../src/store/reducer';

export function newStore() {
  return configureStore({ reducer })
}
