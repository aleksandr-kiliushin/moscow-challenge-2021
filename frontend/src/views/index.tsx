import React, { useEffect, useRef } from 'react'
import Leaflet, { LatLngExpression, Layer, Map } from 'leaflet'
import 'leaflet.heat' // Плагин для отрисовки тепловой карты.

// Models (импортируем функции инициализации данных для отображения на карте).
import {
	initializeAdministrativeDistrictsData,
	initializeMunicipalDistrictsData,
	initializeExistingSchoolsData,
} from '#models/map'

// Utils
import { useAppDispatch, useAppSelector } from '#utils/hooks'
import { DataGenerator } from '../data/DataGenerator'

// Styles
import s from './index.module.css'

// Assets (статические файлы - SVG иконки)
import existingSchoolSvg from '../assets/existing-school.svg'

// Types
import { Feature, Geometry } from 'geojson'
import { ISchool } from '#models/map'

// Data
import cellsData from '../data/cells.json'

export const App = () => {
	const dispatch = useAppDispatch()

	const map = useRef<Map | null>(null)

	// Получаем данные из хранилища.
	const administrativeDistrictsData = useAppSelector(
		(state) => state.map.administrativeDistrictsData,
	)
	const municipalDistrictsData = useAppSelector((state) => state.map.municipalDistrictsData)
	const schoolsData = useAppSelector((state) => state.map.existingSchoolsData)

	const getColor = (value: number) => {
		//value from 0 to 1
		// var hue = ((1 - value) * 120).toString(10)
		// return ['hsl(', hue, ',100%,50%)'].join('')

		return 'red'
	}

	useEffect(() => {
		// Инициализируем получение данных при запуске приложения.
		dispatch(initializeAdministrativeDistrictsData())
		dispatch(initializeMunicipalDistrictsData())
		dispatch(initializeExistingSchoolsData())

		// Фиксируем окно с картой по координатам Москвы.
		map.current = Leaflet.map('mapId').setView([55.6, 37.4], 10)

		// Отображаем географическую карту на подложке.
		Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map.current)
	}, [])

	// Наносим на карту административные районы.
	// useEffect(() => {
	// 	Leaflet.geoJSON(administrativeDistrictsData, {
	// 		style: {
	// 			color: 'black',
	// 			fill: false,
	// 			weight: 5,
	// 		},
	// 	}).addTo(map.current as Map)
	// }, [administrativeDistrictsData])

	// // Наносим на карту муниципальные районы.
	// useEffect(() => {
	// 	const onEachFeature = (district: Feature<Geometry, any>, layer: Layer) => {
	// 		layer.bindPopup(district.properties.NAME, {
	// 			maxWidth: 450,
	// 		})
	// 	}

	// 	Leaflet.geoJSON(municipalDistrictsData, {
	// 		onEachFeature,
	// 		style: {
	// 			color: 'black',
	// 			fillColor: 'black',
	// 			fillOpacity: 0.1,
	// 			weight: 2,
	// 		},
	// 	}).addTo(map.current as Map)
	// }, [municipalDistrictsData])

	// // Наносим на карту существующие школы.
	// useEffect(() => {
	// 	const onEachFeature = (school: Feature<Geometry, ISchool['properties']>, layer: Layer) => {
	// 		layer.bindPopup(school.properties.name, {
	// 			maxWidth: 450,
	// 		})

	// 		// 	// @ts-ignore
	// 		// 	Leaflet.circle([...school.geometry.coordinates].reverse(), {
	// 		// 		color: 'white',
	// 		// 		fillColor: 'white',
	// 		// 		fillOpacity: 0.7,
	// 		// 		radius: school.properties.optimalStudentsAmount * 2,
	// 		// 	}).addTo(map.current as Map)
	// 	}

	// 	const pointToLayer = (school: Feature, latlng: LatLngExpression) => {
	// 		const icon = Leaflet.icon({
	// 			iconSize: [27, 27],
	// 			iconAnchor: [13, 27],
	// 			popupAnchor: [1, -24],
	// 			iconUrl: existingSchoolSvg,
	// 		})
	// 		return Leaflet.marker(latlng, { icon })
	// 	}

	// 	Leaflet.geoJSON(schoolsData, {
	// 		onEachFeature,
	// 		pointToLayer,
	// 	}).addTo(map.current as Map)
	// }, [schoolsData])

	// // Наносим на карту информацию о потребности в школах (тепловая карта).
	// useEffect(() => {
	// 	const points = DataGenerator.overPopulationHeatData()

	// 	Leaflet.heatLayer(points, {
	// 		minOpacity: 0.3,
	// 	}).addTo(map.current as Map)
	// }, [])

	// Наносим на карту информацию о потребности в школах (тепловая карта).
	useEffect(() => {
		Leaflet.geoJSON(cellsData.features, {
			style: (cell) => {
				return {
					color: 'black',
					// @ts-ignore
					fillColor: getColor(cell.self_overload),
					weight: 2,
				}
			},
		}).addTo(map.current as Map)
	}, [])

	return <div id="mapId" className={s.Layout} />
}
