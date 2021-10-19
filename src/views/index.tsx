import React, { useEffect } from 'react'
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

// Models
import { initializeAos, initializeDistricts, initializeSchools } from '#models/districts'

// Components
import { DataPane } from './DataPane'

// Utils
import { useAppDispatch, useAppSelector } from '#utils/hooks'

// Styles
import s from './index.module.css'

// Types
import { Feature, Geometry } from 'geojson'
import { Icon, Layer } from 'leaflet'
import { Legend } from './Legend'

export const App = () => {
	const dispatch = useAppDispatch()

	const aos = useAppSelector((state) => state.districts.aos)
	const districts = useAppSelector((state) => state.districts.districts)
	const schools = useAppSelector((state) => state.districts.schools)

	useEffect(() => {
		dispatch(initializeAos())
		dispatch(initializeDistricts())
		dispatch(initializeSchools())
	}, [])

	const onEachDistrict = (district: Feature<Geometry, any>, layer: Layer) => {
		layer.bindPopup(
			`${district.properties.NAME}, загруженность: ${district.properties.overPopulation}%`,
			{ maxWidth: 450 },
		)

		// @ts-ignore
		layer.options.fillOpacity = Math.random()
	}

	const aoCommonStyle = {
		color: 'black',
		fillOpacity: 0,
		weight: 5,
	}

	const districtCommonStyle = {
		color: 'black',
		fillColor: 'darkred',
		weight: 1,
	}

	// const myIcon = new Icon({
	// 	iconUrl: require('../../assets/school-building.svg'),
	// 	iconSize: [64, 64],
	// 	iconAnchor: [32, 64],
	// })

	return (
		<div className={s.Layout}>
			<div className={s.MapAndLegendContrainer}>
				<MapContainer center={[55.6, 37.4]} zoom={10}>
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<GeoJSON
						// @ts-ignore
						data={aos}
						style={aoCommonStyle}
					/>
					<GeoJSON
						// @ts-ignore
						data={districts}
						onEachFeature={onEachDistrict}
						style={districtCommonStyle}
					/>
					{schools.map((school, index) => (
						<Marker key={index} position={school.geometry.coordinates}>
							<Popup>Оптимальное место для размещения школы.</Popup>
						</Marker>
					))}
				</MapContainer>

				<Legend />
			</div>

			<DataPane />
		</div>
	)
}
