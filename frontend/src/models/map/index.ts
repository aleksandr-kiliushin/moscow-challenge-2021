import { createSlice } from '@reduxjs/toolkit'

// Data
import administrativeDistrictsData from '../../data/administrative-districts.json'
import cellsData from '../../data/cells.json'
import municipalDistrictsData from '../../data/municipal-districts.json'
import schoolsUnderConstructionData from '../../data/schools-under-construction.json'

const initialState: IState = {
	administrativeDistrictsData: {
		features: [],
		type: 'FeatureCollection',
	},
	cellsData: {
		features: [],
		type: 'FeatureCollection',
	},
	municipalDistrictsData: {
		features: [],
		type: 'FeatureCollection',
	},
	schoolsUnderConstructionData: {
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
		initializeCellsData: (state) => {
			// @ts-ignore
			state.cellsData = cellsData
		},
		initializeMunicipalDistrictsData: (state) => {
			// @ts-ignore
			state.municipalDistrictsData = municipalDistrictsData
		},
		initializeSchoolsUnderConstructionData: (state) => {
			// @ts-ignore
			state.schoolsUnderConstructionData = schoolsUnderConstructionData
		},
	},
})

export const {
	initializeAdministrativeDistrictsData,
	initializeCellsData,
	initializeMunicipalDistrictsData,
	initializeSchoolsUnderConstructionData,
} = slice.actions
export const mapReducer = slice.reducer

// Types
interface IState {
	administrativeDistrictsData: IGeoData<IAdministrativeDistrict>
	cellsData: IGeoData<ICell>
	municipalDistrictsData: IGeoData<IMunicipalDistrict>
	schoolsUnderConstructionData: IGeoData<ISchoolUnderConstruction>
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

interface ICell {
	geometry: IPolygonGeometry
	properties: {
		field1: number
		cell_zid: number
		month: string
		year: number
		schoolchildren_self_load_mean: number
		customers_cnt_self: number
		self_overload: number
		is_self_overload: boolean | string
		self_overload_cross_mean: number
		is_self_overload_cross_mean: boolean | string
		customers_cnt_out: number
		out_overload: number
		is_out_overload: boolean | string
		out_overload_cross_mean: number
		is_out_overload_cross_mean: boolean | string
		customers_cnt_in: number
		in_overload: number
		is_in_overload: boolean | string
		in_overload_cross_mean: number
		is_in_overload_cross_mean: boolean | string
		global_id: ''
		ObjectName: ''
		ObjectAddress: ''
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

export interface ISchoolUnderConstruction {
	properties: {
		CadastralNumber: string
		GPZUDocumentNumber: string
		ObjectName: string
	}
	geometry: {
		type: 'Point'
		coordinates: [number, number]
	}
	type: 'Feature'
}
