import React, { useEffect, useMemo, useRef } from 'react'
import { connect } from 'react-redux'
import Leaflet, { Layer, Map } from 'leaflet'

// Models
import { initializeStaticMapData } from '#models/map'

// Components
import { Legend } from './Legend'

// Styles
import s from './index.module.css'

// Assets
import schoolsUnderConstructionSvg from '../assets/school-under-construction.svg'
import greenFlagSvg from '../assets/green-flag.svg'

// Types
import { Feature, Geometry } from 'geojson'
import { IconOptions, LatLngExpression } from 'leaflet'
import { ConnectedProps } from 'react-redux'
import { AppDispatch, RootState } from '#models/store'
import { ISchoolUnderConstruction, ISuggestedOfficeToBuy } from '#models/map'

const _App = ({
	administrativeDistrictsData,
	initializeStaticMapData,
	mfcProblemCellsData,
	municipalDistrictsData,
	schoolProblemCellsData,
	schoolsUnderConstructionData,
	suggestedOfficesToBuyData,
}: IProps) => {
	const map = useRef<Map | null>(null)

	const commonIconProps = useMemo(
		() => ({
			iconSize: [40, 40],
			iconAnchor: [20, 40],
			popupAnchor: [1, -24],
		}),
		[],
	)

	useEffect(() => {
		// Инициализируем получение данных при запуске приложения.
		initializeStaticMapData()
	}, [])

	useEffect(() => {
		if (
			!administrativeDistrictsData.features.length ||
			!mfcProblemCellsData.features.length ||
			!municipalDistrictsData.features.length ||
			!schoolProblemCellsData.features.length ||
			!schoolsUnderConstructionData.features.length ||
			!suggestedOfficesToBuyData.features.length
		) {
			return
		}

		const tileLayer = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
		})

		const administrativeDistrictsDataLayer = Leaflet.geoJSON(administrativeDistrictsData, {
			style: {
				color: '#444',
				fill: false,
				weight: 5,
			},
		})

		const municipalDistrictsDataLayer = Leaflet.geoJSON(municipalDistrictsData, {
			onEachFeature: (district: Feature<Geometry, any>, layer: Layer) => {
				layer.bindPopup(district.properties.NAME, {
					maxWidth: 450,
				})
			},
			style: (municipalDistrict) => {
				const isDistrictBad = false

				return {
					color: '#888',
					fillColor: isDistrictBad ? 'red' : '#888',
					fillOpacity: isDistrictBad ? 0.4 : 0.2,
					weight: 2,
				}
			},
		})

		const schoolProblemCellsDataLayer = Leaflet.geoJSON(schoolProblemCellsData, {
			style: {
				color: 'black',
				fillColor: '#cf0000',
				fillOpacity: 0.6,
				weight: 1,
			},
		})

		const mfcProblemCellsDataLayer = Leaflet.geoJSON(mfcProblemCellsData, {
			style: {
				color: 'black',
				fillColor: '#cf0000',
				fillOpacity: 0.6,
				weight: 1,
			},
		})

		const schoolsUnderConstructionDataLayer = Leaflet.geoJSON(schoolsUnderConstructionData, {
			onEachFeature: (
				school: Feature<any, ISchoolUnderConstruction['properties']>,
				layer: Layer,
			) => {
				layer.bindPopup(
					`
<strong>Имя объекта</strong>: ${school.properties.ObjectName}<br/>
<strong>Кадастровый номер</strong>: ${school.properties.CadastralNumber}<br/>
<strong>Имя документа</strong>: ${school.properties.GPZUDocumentNumber}
`,
					{ maxWidth: 400 },
				)
			},
			pointToLayer: (school: Feature, latlng: LatLngExpression) => {
				const icon = Leaflet.icon({
					...(commonIconProps as Partial<IconOptions>),
					iconUrl: schoolsUnderConstructionSvg,
				})
				return Leaflet.marker(latlng, { icon })
			},
		})

		const suggestedOfficesToBuyDataLayer = Leaflet.geoJSON(suggestedOfficesToBuyData, {
			onEachFeature: (office: Feature<any, ISuggestedOfficeToBuy['properties']>, layer: Layer) => {
				const { PropertyType, ObjectArea } = office.properties
				layer.bindPopup(`Помещение на ${ObjectArea} м2`, { maxWidth: 400 })
			},
			pointToLayer: (school: Feature, latlng: LatLngExpression) => {
				const icon = Leaflet.icon({
					...(commonIconProps as Partial<IconOptions>),
					iconUrl: greenFlagSvg,
				})
				return Leaflet.marker(latlng, { icon })
			},
		})

		const mfcLayerGroup = Leaflet.layerGroup([mfcProblemCellsDataLayer])
		const districtsLayerGroup = Leaflet.layerGroup([
			administrativeDistrictsDataLayer,
			municipalDistrictsDataLayer,
		])
		const schoolsLayerGroup = Leaflet.layerGroup([
			schoolProblemCellsDataLayer,
			schoolsUnderConstructionDataLayer,
			suggestedOfficesToBuyDataLayer,
		])

		const baseMaps = {
			Школы: schoolsLayerGroup,
			МФЦ: mfcLayerGroup,
		}

		map.current = Leaflet.map('mapId', {
			center: [55.6, 37.4],
			zoom: 10,
			layers: [districtsLayerGroup, schoolsLayerGroup, tileLayer],
		})

		Leaflet.control.layers(baseMaps, {}).addTo(map.current as Map)
	}, [
		administrativeDistrictsData,
		mfcProblemCellsData,
		municipalDistrictsData,
		schoolProblemCellsData,
		schoolsUnderConstructionData,
		suggestedOfficesToBuyData,
	])

	return (
		<div className={s.Layout}>
			<div id="mapId" />
			<Legend />
		</div>
	)
}

const mapStateToProps = (state: RootState) => ({
	administrativeDistrictsData: state.map.administrativeDistrictsData,
	mfcProblemCellsData: state.map.mfcProblemCellsData,
	municipalDistrictsData: state.map.municipalDistrictsData,
	schoolProblemCellsData: state.map.schoolProblemCellsData,
	schoolsUnderConstructionData: state.map.schoolsUnderConstructionData,
	suggestedOfficesToBuyData: state.map.suggestedOfficesToBuyData,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
	initializeStaticMapData: () => dispatch(initializeStaticMapData()),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type IProps = ConnectedProps<typeof connector>

export const App = connector(_App)

// const isDistrictBad = [
// 	'Кокошкино',
// 	'Ново-Переделкино',
// 	'Московский',
// 	'Солнцево',
// 	'Щербинка',
// ].includes(municipalDistrict?.properties.NAME)
