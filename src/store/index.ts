import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
  middleware: [window.ipcStore.middleware]
})

window.ipcStore.listen(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch