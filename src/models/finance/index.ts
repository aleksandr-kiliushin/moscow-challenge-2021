import { createSlice } from '@reduxjs/toolkit'

// Types
import { PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '#models/store'
import { ILoadingStatus } from '#interfaces/common'
import { IFinanceCategory, IFinanceCategoryType, IFinanceRecord } from '#interfaces/finance'

// Utils
import { Http } from '#utils/Http'

const initialState: IState = {
	categories: {
		items: [],
		status: 'idle',
	},
	categoryTypes: {
		items: [],
		status: 'idle',
	},
	records: {
		notTrashed: {
			items: [],
			status: 'idle',
		},
		trashed: {
			items: [],
			status: 'idle',
		},
	},
}

const slice = createSlice({
	name: 'finance',
	initialState,
	reducers: {
		setCategories: (state, action: PayloadAction<IFinanceCategory[]>) => {
			state.categories = {
				items: action.payload,
				status: 'success',
			}
		},
		setNotTrashedRecords: (state, action: PayloadAction<IFinanceRecord[]>) => {
			state.records.notTrashed = {
				items: action.payload,
				status: 'success',
			}
		},
		setTrashedRecords: (state, action: PayloadAction<IFinanceRecord[]>) => {
			state.records.trashed = {
				items: action.payload,
				status: 'success',
			}
		},
		setCategoryTypes: (state, action: PayloadAction<IFinanceCategoryType[]>) => {
			state.categoryTypes = {
				items: action.payload,
				status: 'success',
			}
		},
		updateCategory: (state, action: PayloadAction<IFinanceCategory>) => {
			const categoryIndex = state.categories.items.findIndex(
				(category) => category.id === action.payload.id,
			)

			state.categories.items[categoryIndex] = action.payload
		},
	},
})

export const {
	setCategories,
	setCategoryTypes,
	setNotTrashedRecords,
	setTrashedRecords,
	updateCategory,
} = slice.actions
export const financeReducer = slice.reducer

// Thunks
export const getCategories = (): AppThunk => async (dispatch, getState) => {
	if (getState().finance.categories.status !== 'idle') return
	const categories = await Http.get({ url: 'api/finance-category' })
	dispatch(setCategories(categories))
}
export const getCategoryTypes = (): AppThunk => async (dispatch, getState) => {
	if (getState().finance.categoryTypes.status !== 'idle') return
	const categoryTypes = await Http.get({ url: 'api/finance-category-type' })
	dispatch(setCategoryTypes(categoryTypes))
}
export const getRecords = (): AppThunk => async (dispatch, getState) => {
	if (getState().finance.records.notTrashed.status === 'idle') {
		const records = await Http.get({ url: 'api/finance-record?isTrashed=false' })
		dispatch(setNotTrashedRecords(records))
	}

	if (getState().finance.records.trashed.status === 'idle') {
		const records = await Http.get({ url: 'api/finance-record?isTrashed=true' })
		dispatch(setTrashedRecords(records))
	}
}
export const updateCategoryTc =
	({
		categoryId,
		name,
		typeId,
	}: {
		categoryId: IFinanceCategory['id']
		name: IFinanceCategory['name']
		typeId: IFinanceCategoryType['id']
	}): AppThunk =>
	async (dispatch) => {
		const category = await Http.patch({
			payload: {
				name,
				typeId,
			},
			url: 'api/finance-category/' + categoryId,
		})

		dispatch(updateCategory(category))
	}

// Types
interface IState {
	categories: {
		items: IFinanceCategory[]
		status: ILoadingStatus
	}
	categoryTypes: {
		items: IFinanceCategoryType[]
		status: ILoadingStatus
	}
	records: {
		notTrashed: {
			items: IFinanceRecord[]
			status: ILoadingStatus
		}
		trashed: {
			items: IFinanceRecord[]
			status: ILoadingStatus
		}
	}
}
