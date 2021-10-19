import { createSlice } from '@reduxjs/toolkit'

// Data
import geoData from '../../data/mo.json'

// Types
import { PayloadAction } from '@reduxjs/toolkit'

const initialState: IState = {
	districts: [],
}

const slice = createSlice({
	name: 'districts',
	initialState,
	reducers: {
		initializeDistricts: (state) => {
			const districts = geoData.features as IDistrict[]

			districts.forEach((district) => {
				district.properties.overPopulation = Number((Math.random() * 300).toFixed(0))
			})

			state.districts = districts
		},
	},
})

export const { initializeDistricts } = slice.actions
export const districtsReducer = slice.reducer

// Types
interface IState {
	districts: IDistrict[]
}

interface IDistrict {
	type: 'Feature'
	properties: {
		ABBREV_AO: string
		NAME: string
		NAME_AO: string
		OKATO: string
		OKATO_AO: string
		OKTMO: string
		overPopulation: number
		TYPE_MO: string
	}
	geometry: {
		coordinates: [number, number][][]
		type: 'Polygon'
	}
}

// const district = {
// 	type: 'Feature',
// 	properties: {
// 		NAME: 'Щукино',
// 		OKATO: '45283587',
// 		OKTMO: '45372000',
// 		NAME_AO: 'Северо-Западный',
// 		OKATO_AO: '45283000',
// 		ABBREV_AO: 'СЗАО',
// 		TYPE_MO: 'Муниципальный округ',
// 	},
// 	geometry: {
// 		type: 'Polygon',
// 		coordinates: [
// 			[
// 				[37.4461, 55.79449],
// 				[37.44618, 55.79531],
// 				[37.44656, 55.79806],
// 			],
// 		],
// 	},
// }
