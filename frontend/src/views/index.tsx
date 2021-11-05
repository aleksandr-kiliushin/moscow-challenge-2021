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
import { IRecommendedSchoolLocation, ISchoolUnderConstruction } from '#models/map'
import { InfrastructureTypeSelect } from './InfrastructureTypeSelect/Legend'

const _App = ({
	administrativeDistrictsData,
	initializeStaticMapData,
	mfcProblemCellsData,
	municipalDistrictsData,
	recommendedSchoolLocationsData,
	schoolProblemCellsData,
	schoolsUnderConstructionData,
	shownInfrastructureType,
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

		// Фиксируем окно с картой по координатам Москвы.
		map.current = Leaflet.map('mapId').setView([55.6, 37.4], 10)

		// Отображаем географическую карту на подложке.
		Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map.current)
	}, [])

	// Наносим на карту административные районы.
	useEffect(() => {
		Leaflet.geoJSON(administrativeDistrictsData, {
			style: {
				color: '#444',
				fill: false,
				weight: 5,
			},
		}).addTo(map.current as Map)
	}, [administrativeDistrictsData])

	// Наносим на карту муниципальные районы.
	useEffect(() => {
		const onEachFeature = (district: Feature<Geometry, any>, layer: Layer) => {
			layer.bindPopup(district.properties.NAME, {
				maxWidth: 450,
			})
		}

		Leaflet.geoJSON(municipalDistrictsData, {
			onEachFeature,
			style: (municipalDistrict) => {
				const isDistrictBad = false
				// const isDistrictBad = [
				// 	'Кокошкино',
				// 	'Ново-Переделкино',
				// 	'Московский',
				// 	'Солнцево',
				// 	'Щербинка',
				// ].includes(municipalDistrict?.properties.NAME)

				return {
					color: '#888',
					fillColor: isDistrictBad ? 'red' : '#888',
					fillOpacity: isDistrictBad ? 0.4 : 0.2,
					weight: 2,
				}
			},
		}).addTo(map.current as Map)
	}, [municipalDistrictsData])

	// Наносим на карту информацию о потребности в школах.
	useEffect(() => {
		Leaflet.geoJSON(schoolProblemCellsData, {
			filter: (cell) => !!cell.properties.is_out_overload,
			style: {
				color: 'black',
				fillColor: '#cf0000',
				fillOpacity: 0.6,
				weight: 1,
			},
		}).addTo(map.current as Map)
	}, [schoolProblemCellsData])

	// Наносим на карту информацию о потребности в МФЦ.
	useEffect(() => {
		Leaflet.geoJSON(mfcProblemCellsData, {
			style: {
				color: 'black',
				fillColor: '#cf0000',
				fillOpacity: 0.6,
				weight: 1,
			},
		}).addTo(map.current as Map)
	}, [mfcProblemCellsData])

	// Наносим на карту информацию о строящихся школах.
	useEffect(() => {
		const onEachFeature = (
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
		}

		const pointToLayer = (school: Feature, latlng: LatLngExpression) => {
			const icon = Leaflet.icon({
				...(commonIconProps as Partial<IconOptions>),
				iconUrl: schoolsUnderConstructionSvg,
			})
			return Leaflet.marker(latlng, { icon })
		}

		Leaflet.geoJSON(schoolsUnderConstructionData, {
			onEachFeature,
			pointToLayer,
		}).addTo(map.current as Map)
	}, [schoolsUnderConstructionData])

	// Наносим на карту рекомендованные месторасположения школ.
	useEffect(() => {
		const onEachFeature = (
			school: Feature<any, IRecommendedSchoolLocation['properties']>,
			layer: Layer,
		) => {
			layer.bindPopup('Рекомендуемое месторасположение школы.', { maxWidth: 400 })
		}

		const pointToLayer = (school: Feature, latlng: LatLngExpression) => {
			const icon = Leaflet.icon({
				...(commonIconProps as Partial<IconOptions>),
				iconUrl: greenFlagSvg,
			})
			return Leaflet.marker(latlng, { icon })
		}

		Leaflet.geoJSON(recommendedSchoolLocationsData, {
			onEachFeature,
			pointToLayer,
		}).addTo(map.current as Map)
	}, [recommendedSchoolLocationsData])

	return (
		<div className={s.Layout}>
			<div id="mapId" />
			<Legend />
			<InfrastructureTypeSelect />
		</div>
	)
}

const mapStateToProps = (state: RootState) => ({
	administrativeDistrictsData: state.map.administrativeDistrictsData,
	mfcProblemCellsData: state.map.mfcProblemCellsData,
	municipalDistrictsData: state.map.municipalDistrictsData,
	recommendedSchoolLocationsData: state.map.recommendedSchoolLocationsData,
	schoolProblemCellsData: state.map.schoolProblemCellsData,
	schoolsUnderConstructionData: state.map.schoolsUnderConstructionData,
	shownInfrastructureType: state.map.shownInfrastructureType,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
	initializeStaticMapData: () => dispatch(initializeStaticMapData()),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type IProps = ConnectedProps<typeof connector>

export const App = connector(_App)
