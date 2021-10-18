import React from 'react'

// Data
import ao from '../data/mo.json'

export const DataPane = () => {
	return (
		<ul>
			{ao.features.map((feature) => (
				<li key={feature.properties.NAME}>{feature.properties.NAME}</li>
			))}
		</ul>
	)
}
