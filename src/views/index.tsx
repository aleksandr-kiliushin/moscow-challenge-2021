import React, { useEffect, useRef } from 'react'
import Leaflet, { Layer, Map } from 'leaflet'
import 'leaflet.heat'

// Models
import { initializeAos, initializeDistricts, initializeSchools } from '#models/districts'

// Components
import { DataPane } from './DataPane'
import { Legend } from './Legend'

// Utils
import { useAppDispatch, useAppSelector } from '#utils/hooks'
import { DataGenerator } from '../data/DataGenerator'

// Styles
import s from './index.module.css'

// Types
// import { Feature, Geometry } from 'geojson'

export const App = () => {
	const dispatch = useAppDispatch()

	const map = useRef<Map | null>(null)

	// const aos = useAppSelector((state) => state.districts.aos)
	// const districts = useAppSelector((state) => state.districts.districts)
	const schools = useAppSelector((state) => state.districts.schools)

	useEffect(() => {
		dispatch(initializeAos())
		dispatch(initializeDistricts())
		dispatch(initializeSchools())

		map.current = Leaflet.map('mapId').setView([55.6, 37.4], 10)

		Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map.current)
	}, [])

	// useEffect(() => {
	// 	Leaflet.geoJSON(aos, {
	// 		style: {
	// 			color: 'black',
	// 			fillOpacity: 0,
	// 			weight: 5,
	// 		},
	// 	}).addTo(map.current as Map)
	// }, [aos])

	// useEffect(() => {

	// // const onEachDistrict = (district: Feature<Geometry, any>, layer: Layer) => {
	// // 	layer.bindPopup(
	// // 		`${district.properties.NAME}, загруженность: ${district.properties.overPopulation}%`,
	// // 		{ maxWidth: 450 },
	// // 	)
	// // }

	// 	Leaflet.geoJSON(districts, {
	// 		style: {
	// 			color: 'black',
	// 			fillColor: 'black',
	// 			fillOpacity: 0.1,
	// 			weight: 2,
	// 		},
	// 	}).addTo(map.current as Map)
	// }, [districts])

	useEffect(() => {
		Leaflet.geoJSON(schools).addTo(map.current as Map)
	}, [schools])

	useEffect(() => {
		// [lat, lng, intensity]
		const points = DataGenerator.overPopulationHeatData()

		console.log(points)
		// @ts-ignore
		Leaflet.heatLayer(points).addTo(map.current as Map)
	}, [])

	return (
		<div className={s.Layout}>
			<div className={s.MapAndLegendContrainer}>
				<div id="mapId" />
				<Legend />
			</div>

			<DataPane />
		</div>
	)
}
