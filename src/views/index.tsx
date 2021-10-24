import React, { useEffect, useRef } from 'react'
import Leaflet, { LatLngExpression, Layer, Map } from 'leaflet'

// Models (импортируем функции инициализации данных для отображения на карте).
import {
	initializeAdministrativeDistrictsData,
	initializeCellsData,
	initializeMunicipalDistrictsData,
	initializeSchoolsUnderConstructionData,
} from '#models/map'

// Utils
import { useAppDispatch, useAppSelector } from '#utils/hooks'

// Styles
import s from './index.module.css'

// Assets (статические файлы - SVG иконки)
import schoolsUnderConstructionSvg from '../assets/school-under-construction.svg'

// Types
import { Feature, Geometry } from 'geojson'

export const App = () => {
	const dispatch = useAppDispatch()

	const map = useRef<Map | null>(null)

	// Получаем данные из хранилища.
	const administrativeDistrictsData = useAppSelector(
		(state) => state.map.administrativeDistrictsData,
	)
	const cellsData = useAppSelector((state) => state.map.cellsData)
	const municipalDistrictsData = useAppSelector((state) => state.map.municipalDistrictsData)
	const schoolsUnderConstructionData = useAppSelector(
		(state) => state.map.schoolsUnderConstructionData,
	)

	useEffect(() => {
		// Инициализируем получение данных при запуске приложения.
		dispatch(initializeAdministrativeDistrictsData())
		dispatch(initializeCellsData())
		dispatch(initializeMunicipalDistrictsData())
		dispatch(initializeSchoolsUnderConstructionData())

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
			style: {
				color: '#888',
				fillColor: '#888',
				fillOpacity: 0.2,
				weight: 2,
			},
		}).addTo(map.current as Map)
	}, [municipalDistrictsData])

	// Наносим на карту информацию о потребности в школах (тепловая карта).
	useEffect(() => {
		Leaflet.geoJSON(cellsData, {
			filter: (cell) => !!cell.properties.is_out_overload,
			style: {
				color: 'black',
				fillColor: '#cf0000',
				fillOpacity: 0.7,
				weight: 1,
			},
		}).addTo(map.current as Map)
	}, [cellsData])

	// Наносим на карту информацию о потребности в школах (тепловая карта).
	useEffect(() => {
		const pointToLayer = (school: Feature, latlng: LatLngExpression) => {
			const icon = Leaflet.icon({
				iconSize: [27, 27],
				iconAnchor: [13, 27],
				popupAnchor: [1, -24],
				iconUrl: schoolsUnderConstructionSvg,
			})
			return Leaflet.marker(latlng, { icon })
		}

		Leaflet.geoJSON(schoolsUnderConstructionData, {
			pointToLayer,
		}).addTo(map.current as Map)
	}, [schoolsUnderConstructionData])

	return <div id="mapId" className={s.Layout} />
}
