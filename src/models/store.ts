import { configureStore } from '@reduxjs/toolkit'

// Reducers
import { commonReducer } from './common'

// Types
import { Action, ThunkAction } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		common: commonReducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
