import { configureStore } from "@reduxjs/toolkit";
import { reducer } from '../../src/store/reducer';

export const store = configureStore({ reducer })
