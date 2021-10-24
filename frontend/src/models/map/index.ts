import { createSlice } from '@reduxjs/toolkit'

// Data
import administrativeDistrictsData from '../../data/administrative-districts.json'
import municipalDistrictsData from '../../data/municipal-districts.json'
import existingSchoolsData from '../../data/existing-schools.json'

const initialState: IState = {
	administrativeDistrictsData: {
		features: [],
		type: 'FeatureCollection',
	},
	municipalDistrictsData: {
		features: [],
		type: 'FeatureCollection',
	},
	existingSchoolsData: {
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
		initializeExistingSchoolsData: (state) => {
			// @ts-ignore
			state.existingSchoolsData = existingSchoolsData
		},
	},
})

export const {
	initializeAdministrativeDistrictsData,
	initializeMunicipalDistrictsData,
	initializeExistingSchoolsData,
} = slice.actions
export const mapReducer = slice.reducer

// Types
interface IState {
	administrativeDistrictsData: IGeoData<IAdministrativeDistrict>
	municipalDistrictsData: IGeoData<IMunicipalDistrict>
	existingSchoolsData: IGeoData<ISchool>
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
		name: string
	}
	geometry: {
		type: 'Point'
		coordinates: [number, number]
	}
	type: 'Feature'
}
