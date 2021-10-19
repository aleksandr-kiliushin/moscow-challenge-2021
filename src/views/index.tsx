import React, { useEffect } from 'react'
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet'

// Models
import { initializeDistricts } from '#models/finance'

// Components
import { DataPane } from './DataPane'

// Styles
import s from './index.module.css'

// Utils
import { useAppDispatch, useAppSelector } from '#utils/hooks'

// Types
import { Feature, Geometry } from 'geojson'
import { Layer } from 'leaflet'
import { Legend } from './Legend'

export const App = () => {
	const dispatch = useAppDispatch()

	const districts = useAppSelector((state) => state.districts.districts)

	useEffect(() => {
		dispatch(initializeDistricts())
	}, [])

	const onEachDistrict = (district: Feature<Geometry, any>, layer: Layer) => {
		layer.bindPopup(
			`${district.properties.NAME}, загруженность: ${district.properties.overPopulation}%`,
			{ maxWidth: 450 },
		)

		// @ts-ignore
		layer.options.fillOpacity = Math.random()
	}

	const districtCommonStyle = {
		color: 'black',
		fillColor: 'darkred',
		weight: 1,
	}

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
						data={districts}
						onEachFeature={onEachDistrict}
						style={districtCommonStyle}
					/>
				</MapContainer>

				<Legend />
			</div>

			<DataPane />
		</div>
	)
}
