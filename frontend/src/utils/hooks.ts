import { useDispatch, useSelector } from 'react-redux'

// Types
import { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '#models/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
