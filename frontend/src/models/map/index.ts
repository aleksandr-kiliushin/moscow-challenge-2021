import { createSlice } from '@reduxjs/toolkit'

// Data
import administrativeDistrictsData from '../../data/administrative-districts.json'
import municipalDistrictsData from '../../data/municipal-districts.json'
import schoolsData from '../../data/existing-schools.json'

const initialState: IState = {
	administrativeDistrictsData: {
		features: [],
		type: 'FeatureCollection',
	},
	municipalDistrictsData: {
		features: [],
		type: 'FeatureCollection',
	},
	schoolsData: {
		features: [],
		type: 'FeatureCollection',
	},
}

const slice = createSlice({
	name: 'map',
	initialState,
	reducers: {
		initializeAdministrativeDistrictsData: (state) => {
			// @ts-ignore
			state.administrativeDistrictsData = administrativeDistrictsData
		},
		initializeMunicipalDistrictsData: (state) => {
			// @ts-ignore
			state.municipalDistrictsData = municipalDistrictsData
		},
		initializeSchoolsData: (state) => {
			// @ts-ignore
			state.schoolsData = schoolsData
		},
	},
})

export const {
	initializeAdministrativeDistrictsData,
	initializeMunicipalDistrictsData,
	initializeSchoolsData,
} = slice.actions
export const mapReducer = slice.reducer

// Types
interface IState {
	administrativeDistrictsData: IGeoData<IAdministrativeDistrict>
	municipalDistrictsData: IGeoData<IMunicipalDistrict>
	schoolsData: IGeoData<ISchool>
}

interface IGeoData<F> {
	features: F[]
	type: 'FeatureCollection'
}

interface IMultiPolygonGeometry {
	coordinates: [number, number][][][]
	type: 'MultiPolygon'
}

interface IPolygonGeometry {
	coordinates: [number, number][][]
	type: 'Polygon'
}

interface IAdministrativeDistrict {
	geometry: IMultiPolygonGeometry | IPolygonGeometry
	properties: {
		NAME: string
		OKATO: string
		ABBREV: string
	}
	type: 'Feature'
}

interface IMunicipalDistrict {
	geometry: IMultiPolygonGeometry | IPolygonGeometry
	properties: {
		ABBREV_AO: string
		NAME: string
		NAME_AO: string
		OKATO: string
		OKATO_AO: string
		OKTMO: string
		TYPE_MO: string
	}
	type: 'Feature'
}

export interface ISchool {
	properties: {
		optimalStudentsAmount: number
		schoolName: string
		studentsAmount: number
	}
	geometry: {
		type: 'Point'
		coordinates: [number, number]
	}
	type: 'Feature'
}

// const municipalDistrict = {
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

// const administrativeDistrict = {
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
