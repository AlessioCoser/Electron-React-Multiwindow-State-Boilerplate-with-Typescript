import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '..'

enum Windows {increment, decrement}

type ElectronWindows = {[key in keyof typeof Windows]: boolean }

// Define a type for the slice state
interface ElectronState {
  windows: ElectronWindows
}

// Define the initial state using that type
const initialState: ElectronState = {
  windows: {
    increment: true,
    decrement: false
  }
}

export const electronSlice = createSlice({
  name: 'electron',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openDecrementWindow: state => {
      state.windows.decrement = true
    },
    closeDecrementWindow: state => {
      state.windows.decrement = false
    }
  }
})
export default electronSlice.reducer

export const { openDecrementWindow, closeDecrementWindow } = electronSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectDecrementWindowOpened = (state: RootState) => state.electron.windows.decrement
