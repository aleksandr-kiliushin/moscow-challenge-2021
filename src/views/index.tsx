import React, { useEffect } from 'react'
import Leaflet from 'leaflet'

// Styles
import s from './index.module.css'

console.log(process.env.MAP_BOX_ACCESS_TOKEN)

export const App = () => {
	/** Initialize app. */
	useEffect(() => {
		const myMap = Leaflet.map('mapid').setView([55.67, 37.5], 10)

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
	}, [])

	return (
		<div className={s.Layout}>
			<div id="mapid">map</div>
			<div>table</div>
		</div>
	)
}
