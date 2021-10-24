import React, { useEffect, useRef } from 'react'
import Leaflet, { LatLngExpression, Layer, Map } from 'leaflet'

// Models (импортируем функции инициализации данных для отображения на карте).
import {
	initializeAdministrativeDistrictsData,
	initializeCellsData,
	initializeMunicipalDistrictsData,
} from '#models/map'

// Utils
import { useAppDispatch, useAppSelector } from '#utils/hooks'

// Styles
import s from './index.module.css'

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

	useEffect(() => {
		// Инициализируем получение данных при запуске приложения.
		dispatch(initializeAdministrativeDistrictsData())
		dispatch(initializeCellsData())
		dispatch(initializeMunicipalDistrictsData())

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
				color: 'black',
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
				color: 'black',
				fillColor: 'black',
				fillOpacity: 0.1,
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
				weight: 2,
			},
		}).addTo(map.current as Map)
	}, [cellsData])

	return <div id="mapId" className={s.Layout} />
}
