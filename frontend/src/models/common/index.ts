import { createSlice } from '@reduxjs/toolkit'

// Types
import { PayloadAction } from '@reduxjs/toolkit'

const initialState: IState = {
	redirectPath: null,
}

const slice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		setRedirectPath: (state, action: PayloadAction<IState['redirectPath']>) => {
			state.redirectPath = action.payload
		},
	},
})

export const { setRedirectPath } = slice.actions
export const commonReducer = slice.reducer

// Types
interface IState {
	redirectPath: null | string
}
