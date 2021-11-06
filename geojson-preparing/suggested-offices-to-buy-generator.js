'use strict'

const fs = require('fs')
const Papa = require('papaparse')

const processCsv = async () => {
	const csvFile = fs.readFileSync('./input/suggested-offices-to-buy.csv')
	const csvData = csvFile.toString()

	const csvParsed = Papa.parse(csvData, {
		header: true,
		complete: (results) => {
			return results.data
		},
	})

	const parsedData = csvParsed.data

	const filteredData = parsedData.filter((office) => Number(office.ObjectArea) >= 300)

	const prettifiedData = filteredData.map(({ coordinates, ...rest }) => ({
		geometry: {
			coordinates: JSON.parse(coordinates),
			type: 'Point',
		},
		properties: {
			...rest,
			ObjectArea: Number(rest.ObjectArea),
		},
		type: 'Feature',
	}))

	const output = {
		type: 'FeatureCollection',
		features: prettifiedData,
	}

	fs.writeFileSync('./output/suggested-offices-to-buy.json', JSON.stringify(output))
}

processCsv()
