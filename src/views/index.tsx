import React, { useEffect } from 'react'
import Leaflet from 'leaflet'

// Components
import { DataPane } from './DataPane'

// Styles
import s from './index.module.css'

// Data
import ao from './data/mo.json'

export const App = () => {
	/** Initialize app. */
	useEffect(() => {
		const myMap = Leaflet.map('mapid').setView([55.6, 37.4], 10)

		Leaflet.tileLayer(
			'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
			{
				attribution:
					'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				maxZoom: 18,
				id: 'mapbox/streets-v11',
				tileSize: 512,
				zoomOffset: -1,
				accessToken: process.env.MAP_BOX_ACCESS_TOKEN,
			},
		).addTo(myMap)

		ao.features.forEach((feature) => {
			Leaflet.polygon(
				feature.geometry.coordinates[0].map(([x, y]) => [y, x]),
				// feature.geometry.coordinates[0].map(([x, y]) => [y, x]),
				// {
				// 	color: feature.properties.fill,
				// },
			).addTo(myMap)
		})
	}, [])

	return (
		<div className={s.Layout}>
			<div id="mapid">map</div>

			<DataPane />
		</div>
	)
}
