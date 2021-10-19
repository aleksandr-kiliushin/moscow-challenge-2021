import { configureStore } from '@reduxjs/toolkit'

// Reducers
import { commonReducer } from './common'
import { mapReducer } from './map'

// Types
import { Action, ThunkAction } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		common: commonReducer,
		map: mapReducer,
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
