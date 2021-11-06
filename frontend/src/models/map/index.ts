import { createSlice } from '@reduxjs/toolkit'

// Data
import administrativeDistrictsData from '../../data/administrative-districts.json'
import mfcProblemCellsData from '../../data/mfc-problem-cells.json'
import municipalDistrictsData from '../../data/municipal-districts.json'
import schoolProblemCellsData from '../../data/school-problem-cells.json'
import schoolsUnderConstructionData from '../../data/schools-under-construction.json'
import suggestedOfficesToBuyData from '../../data/suggested-offices-to-buy.json'

const initialState: IState = {
	administrativeDistrictsData: { features: [], type: 'FeatureCollection' },
	mfcProblemCellsData: { features: [], type: 'FeatureCollection' },
	municipalDistrictsData: { features: [], type: 'FeatureCollection' },
	schoolProblemCellsData: { features: [], type: 'FeatureCollection' },
	schoolsUnderConstructionData: { features: [], type: 'FeatureCollection' },
	suggestedOfficesToBuyData: { features: [], type: 'FeatureCollection' },
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
			// @ts-ignore
			state.schoolProblemCellsData = schoolProblemCellsData
			state.schoolsUnderConstructionData =
				schoolsUnderConstructionData as IGeoData<ISchoolUnderConstruction>
			state.suggestedOfficesToBuyData = suggestedOfficesToBuyData as IGeoData<ISuggestedOfficeToBuy>
		},
	},
})

export const { initializeStaticMapData } = slice.actions
export const mapReducer = slice.reducer

// Types
interface IState {
	administrativeDistrictsData: IGeoData<IAdministrativeDistrict>
	mfcProblemCellsData: IGeoData<IProblemCell>
	municipalDistrictsData: IGeoData<IMunicipalDistrict>
	schoolProblemCellsData: IGeoData<IProblemCell>
	schoolsUnderConstructionData: IGeoData<ISchoolUnderConstruction>
	suggestedOfficesToBuyData: IGeoData<ISuggestedOfficeToBuy>
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

export interface ISchoolUnderConstruction {
	properties: {
		CadastralNumber: string
		GPZUDocumentNumber: string
		ObjectName: string
	}
	geometry: IPointGeometry
	type: 'Feature'
}

export interface ISuggestedOfficeToBuy {
	properties: {
		'': string
		AdmArea: string
		District: string
		Address: string
		PropertyType: string
		ObjectArea: number
		Note: string
		global_id: string
	}
	geometry: IPointGeometry
	type: 'Feature'
}
