import React from 'react'

// Styles
import s from './index.module.css'

export const Legend = () => {
	const legendData: ILegendDataItem[] = [
		{
			backgroundColor: 'green',
			color: 'white',
			maxOverPopulation: 99,
			minOverPopulation: 0,
		},
		{
			backgroundColor: 'yellow',
			color: 'black',
			maxOverPopulation: 179,
			minOverPopulation: 100,
		},
		{
			backgroundColor: 'red',
			color: 'black',
			maxOverPopulation: 249,
			minOverPopulation: 180,
		},
		{
			backgroundColor: 'darkred',
			color: 'white',
			maxOverPopulation: 300,
			minOverPopulation: 250,
		},
	]

	return (
		<div className={s.Legend}>
			{legendData.map(({ backgroundColor, color, maxOverPopulation, minOverPopulation }, index) => (
				<div className={s.LegendItem} key={index} style={{ backgroundColor, color }}>
					{minOverPopulation}% - {maxOverPopulation}%
				</div>
			))}
		</div>
	)
}

interface ILegendDataItem {
	backgroundColor: string
	color: string
	maxOverPopulation: number
	minOverPopulation: number
}
