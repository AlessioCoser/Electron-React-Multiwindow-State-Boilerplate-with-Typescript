import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { reducer } from './reducer'

const persistConfig = {
  key: 'root',
  storage: window.createIpcStoreClient()
}

const persistedReducer = persistReducer(persistConfig, reducer)
export const store = configureStore({reducer: persistedReducer, middleware: [window.ipcStoreMiddleware] })
export let persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch