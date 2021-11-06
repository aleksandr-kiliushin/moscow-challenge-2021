'use strict'

const fs = require('fs')
const Papa = require('papaparse')

const processCsv = async () => {
	const csvFile = fs.readFileSync('./input/mfc-problem-cells.csv')
	const csvData = csvFile.toString()

	const csvParsed = Papa.parse(csvData, {
		header: true,
		complete: (results) => {
			return results.data
		},
	})

	const parsedData = csvParsed.data
	// parsedData.length = csvParsed.data.length - 1
	parsedData.pop()

	const prettifiedData = parsedData.map((cell) => ({
		geometry: {
			coordinates: [JSON.parse(cell.coordinates)],
			type: 'Polygon',
		},
		properties: {
			cell_zid: Number(cell.cell_zid),
		},
		type: 'Feature',
	}))

	console.log(prettifiedData)

	const output = {
		type: 'FeatureCollection',
		features: prettifiedData,
	}

	fs.writeFileSync('./output/mfc-problem-cells.json', JSON.stringify(output))
}

processCsv()
