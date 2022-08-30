import { TypedUseSelectorHook, useDispatch as useOriginalDispatch,  useSelector as useOriginalSelector } from 'react-redux'
import type { RootState, AppDispatch } from '.'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch: () => AppDispatch = useOriginalDispatch
export const useSelector: TypedUseSelectorHook<RootState> = useOriginalSelector