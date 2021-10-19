import React from 'react'
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet'

// Components
import { DataPane } from './DataPane'

// Styles
import s from './index.module.css'

// Data
import districts from '../data/mo.json'

// Types
import { Feature, Geometry } from 'geojson'
import { Layer } from 'leaflet'
import { Legend } from './Legend'

districts.features.forEach((feature) => {
	const overPopulation = Number((Math.random() * 300).toFixed(0))

	//@ts-ignore
	feature.properties.overPopulation = overPopulation
})

export const App = () => {
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
						data={districts.features}
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
