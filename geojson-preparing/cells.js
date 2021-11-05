'use strict'

const fs = require('fs')
const path = require('path')

const rawCellsData = fs.readFileSync(path.resolve(__dirname, 'files', 'cells.json'))
const rawCellsToExcludeData = fs.readFileSync(path.resolve(__dirname, 'files', 'cells-to-exclude.json'))

const cellsData = JSON.parse(rawCellsData)
const cellsToExcludeData = JSON.parse(rawCellsToExcludeData)

const cellsWithoutParks = {
	type: 'FeatureCollection',
	features: []
}

cellsData.features.forEach((feature) => {
	if (!cellsToExcludeData.includes(feature.properties.cell_zid)) {
		cellsWithoutParks.features.push(feature)
	}
})

fs.writeFileSync(path.resolve(__dirname, 'files', 'cells-without-parks.json'), JSON.stringify(cellsWithoutParks))
