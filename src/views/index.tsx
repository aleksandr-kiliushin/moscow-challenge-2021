import React, { useEffect, useRef } from 'react'
import Leaflet, { LatLngExpression, Layer, Map } from 'leaflet'
import 'leaflet.heat'

// Models
import {
	initializeAdministrativeDistrictsData,
	initializeMunicipalDistrictsData,
	initializeSchoolsData,
} from '#models/map'

// Components
import { DataPane } from './DataPane'
import { Legend } from './Legend'

// Utils
import { useAppDispatch, useAppSelector } from '#utils/hooks'
import { DataGenerator } from '../data/DataGenerator'

// Styles
import s from './index.module.css'

// Assets
import existingSchoolSvg from '../assets/existing-school.svg'

// Types
import { Feature, Geometry } from 'geojson'
import { ISchool } from '#models/map'

export const App = () => {
	const dispatch = useAppDispatch()

	const map = useRef<Map | null>(null)

	const administrativeDistrictsData = useAppSelector(
		(state) => state.map.administrativeDistrictsData,
	)
	const municipalDistrictsData = useAppSelector((state) => state.map.municipalDistrictsData)
	const schoolsData = useAppSelector((state) => state.map.schoolsData)

	useEffect(() => {
		dispatch(initializeAdministrativeDistrictsData())
		dispatch(initializeMunicipalDistrictsData())
		dispatch(initializeSchoolsData())

		map.current = Leaflet.map('mapId').setView([55.6, 37.4], 10)

		Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map.current)
	}, [])

	useEffect(() => {
		Leaflet.geoJSON(administrativeDistrictsData, {
			style: {
				color: 'black',
				fill: false,
				weight: 5,
			},
		}).addTo(map.current as Map)
	}, [administrativeDistrictsData])

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

	useEffect(() => {
		const onEachFeature = (school: Feature<Geometry, ISchool['properties']>, layer: Layer) => {
			layer.bindPopup(school.properties.schoolName, {
				maxWidth: 450,
			})

			// @ts-ignore
			Leaflet.circle([...school.geometry.coordinates].reverse(), {
				color: 'brown',
				fillColor: 'brown',
				fillOpacity: 0.7,
				radius: school.properties.optimalStudentsAmount * 2,
			}).addTo(map.current as Map)
		}

		const pointToLayer = (school: Feature, latlng: LatLngExpression) => {
			const icon = Leaflet.icon({
				iconSize: [27, 27],
				iconAnchor: [13, 27],
				popupAnchor: [1, -24],
				iconUrl: existingSchoolSvg,
			})
			return Leaflet.marker(latlng, { icon })
		}

		Leaflet.geoJSON(schoolsData, {
			onEachFeature,
			pointToLayer,
		}).addTo(map.current as Map)
	}, [schoolsData])

	useEffect(() => {
		const points = DataGenerator.overPopulationHeatData()

		Leaflet.heatLayer(points, {
			minOpacity: 0.3,
		}).addTo(map.current as Map)
	}, [])

	useEffect(() => {
		const icon = Leaflet.icon({
			iconUrl:
				'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fmoscow&psig=AOvVaw2b3gLuNeytxZYB5qc3QUga&ust=1634808625468000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLjY-OzW2PMCFQAAAAAdAAAAABAI',
			iconSize: [38, 95], // size of the icon
			shadowSize: [50, 64], // size of the shadow
			iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
			shadowAnchor: [4, 62], // the same for the shadow
			popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
		})

		Leaflet.marker([51.5, -0.09], { icon }).addTo(map.current as Map)
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
