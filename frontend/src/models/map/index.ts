import { createSlice } from '@reduxjs/toolkit'

// Data
import administrativeDistrictsData from '../../data/administrative-districts.json'
import mfcProblemCellsData from '../../data/mfc-problem-cells.json'
import municipalDistrictsData from '../../data/municipal-districts.json'
import recommendedSchoolLocationsData from '../../data/recommended-school-locations.json'
import schoolProblemCellsData from '../../data/school-problem-cells.json'
import schoolsUnderConstructionData from '../../data/schools-under-construction.json'

const initialState: IState = {
	administrativeDistrictsData: {
		features: [],
		type: 'FeatureCollection',
	},
	municipalDistrictsData: {
		features: [],
		type: 'FeatureCollection',
	},
	recommendedSchoolLocationsData: {
		features: [],
		type: 'FeatureCollection',
	},
	schoolProblemCellsData: {
		features: [],
		type: 'FeatureCollection',
	},
	mfcProblemCellsData: {
		features: [],
		type: 'FeatureCollection',
	},
	schoolsUnderConstructionData: {
		features: [],
		type: 'FeatureCollection',
	},
	shownInfrastructureType: 'schools',
}

const slice = createSlice({
	name: 'map',
	initialState,
	reducers: {
		initializeStaticMapData: (state) => {
			// @ts-ignore
			state.administrativeDistrictsData = administrativeDistrictsData
			state.mfcProblemCellsData = mfcProblemCellsData as IGeoData<IProblemCell>
			// @ts-ignore
			state.municipalDistrictsData = municipalDistrictsData
			state.recommendedSchoolLocationsData =
				recommendedSchoolLocationsData as IGeoData<IRecommendedSchoolLocation>
			// @ts-ignore
			state.schoolProblemCellsData = schoolProblemCellsData
			state.schoolsUnderConstructionData =
				schoolsUnderConstructionData as IGeoData<ISchoolUnderConstruction>
		},
		setShownInfrastructureType: (state, action) => {
			state.shownInfrastructureType = action.payload
		},
	},
})

export const { initializeStaticMapData, setShownInfrastructureType } = slice.actions
export const mapReducer = slice.reducer

// Types
interface IState {
	administrativeDistrictsData: IGeoData<IAdministrativeDistrict>
	mfcProblemCellsData: IGeoData<IProblemCell>
	municipalDistrictsData: IGeoData<IMunicipalDistrict>
	recommendedSchoolLocationsData: IGeoData<IRecommendedSchoolLocation>
	schoolProblemCellsData: IGeoData<IProblemCell>
	schoolsUnderConstructionData: IGeoData<ISchoolUnderConstruction>
	shownInfrastructureType: IInfrastructureType
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

interface IPointGeometry {
	coordinates: [number, number]
	type: 'Point'
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

export interface IProblemCell {
	geometry: IPolygonGeometry
	properties: {
		cell_zid: number
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

export interface IRecommendedSchoolLocation {
	properties: {}
	geometry: IPointGeometry
	type: 'Feature'
}

export interface ISchoolUnderConstruction {
	properties: {
		CadastralNumber: string
		GPZUDocumentNumber: string
		ObjectName: string
	}
	geometry: IPointGeometry
	type: 'Feature'
}

export type IInfrastructureType = 'mfc' | 'schools'
