import { createSlice } from '@reduxjs/toolkit'

// Data
import aosData from '../../data/ao.json'
import geoData from '../../data/mo.json'
import schoolsData from '../../data/schools.json'

const initialState: IState = {
	aos: [],
	districts: [],
	schools: [],
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
		initializeAos: (state) => {
			state.aos = aosData.features as IAo[]
		},
		initializeSchools: (state) => {
			state.schools = schoolsData.features as ISchool[]
		},
	},
})

export const { initializeAos, initializeDistricts, initializeSchools } = slice.actions
export const districtsReducer = slice.reducer

// Types
interface IState {
	aos: IAo[]
	districts: IDistrict[]
	schools: ISchool[]
}

interface IMultiPolygonGeometry {
	coordinates: [number, number][][][]
	type: 'MultiPolygon'
}

interface IPolygonGeometry {
	coordinates: [number, number][][]
	type: 'Polygon'
}

interface IAo {
	geometry: IMultiPolygonGeometry | IPolygonGeometry
	properties: {
		NAME: string
		OKATO: string
		ABBREV: string
	}
	type: 'Feature'
}

interface IDistrict {
	geometry: IMultiPolygonGeometry | IPolygonGeometry
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
	type: 'Feature'
}

interface ISchool {
	properties: {}
	geometry: {
		type: 'Point'
		coordinates: [number, number]
	}
	type: 'Feature'
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

// const ao = {
// 	type: 'Feature',
// 	properties: { NAME: 'Троицкий', OKATO: '45298000', ABBREV: 'Троицкий' },
// 	geometry: {
// 		type: 'MultiPolygon',
// 		coordinates: [
// 			[
// 				[
// 					[36.8031, 55.44083],
// 					[36.80319, 55.4416],
// 					[36.81136, 55.4363],
// 					[36.8031, 55.44083],
// 				],
// 			],
// 			[
// 				[
// 					[36.90075, 55.31486],
// 					[36.90325, 55.31611],
// 					[36.90128, 55.31396],
// 					[36.90075, 55.31486],
// 				],
// 			],
// 		],
// 	},
// }
