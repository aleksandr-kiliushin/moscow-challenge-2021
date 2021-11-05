'use strict'

const fs = require('fs')
const Papa = require('papaparse')

const processCsv = async () => {
	const csvFile = fs.readFileSync('./input/cell-stats-output-v4-mfc.csv')
	const csvData = csvFile.toString()

	const csvParsed = Papa.parse(csvData, {
		header: true,
		complete: (results) => {
			return results.data
		},
	})

	const parsedData = csvParsed.data

	const filteredData = parsedData.filter(
		(cell) => cell.is_in_overload_cross_mean === 'True' && cell.month === 'July',
	)

	const prettifiedData = filteredData.map((cell) => ({
		geometry: {
			coordinates: [JSON.parse(cell.coordinates)],
			type: 'Polygon',
		},
		properties: {
			cell_zid: Number(cell.cell_zid),
		},
		type: 'Feature',
	}))

	const output = {
		type: 'FeatureCollection',
		features: prettifiedData,
	}

	fs.writeFileSync('./output/mfc-problem-cells.json', JSON.stringify(output))
}

processCsv()
