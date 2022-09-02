import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'
import { AppWindowTypes } from '../../../commons/AppWindowTypes'

type ElectronWindow = { open: boolean, show: boolean }

type ElectronWindows = {[key in AppWindowTypes]: ElectronWindow }

// Define a type for the slice state
interface ElectronState {
  windows: ElectronWindows
}

// Define the initial state using that type
const initialState: ElectronState = {
  windows: {
    increment: { open: true, show: true },
    decrement: { open: false, show: true }
  }
}

export const electronSlice = createSlice({
  name: 'electron',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openWindow: (state, action: PayloadAction<AppWindowTypes>) => {
      if(!state.windows[action.payload].open) {
        state.windows[action.payload].open = true
      }
    },
    closeWindow: (state, action: PayloadAction<AppWindowTypes>) => {
      if(state.windows[action.payload].open) {
        state.windows[action.payload].open = false
      }
    },
    showWindow: (state, action: PayloadAction<AppWindowTypes>) => {
      if(!state.windows[action.payload].show) {
        state.windows[action.payload].show = true
      }
    },
    hideWindow: (state, action: PayloadAction<AppWindowTypes>) => {
      if(state.windows[action.payload].show) {
        state.windows[action.payload].show = false
      }
    }
  }
})
export default electronSlice.reducer

export const { openWindow, closeWindow } = electronSlice.actions

export const selectWindow = (window: AppWindowTypes) => (state: RootState) => state.electron.windows[window]
