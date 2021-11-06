'use strict'

const fs = require('fs')

const rawData = fs.readFileSync('./input/school-problem-cells.json').toString()

const data = JSON.parse(rawData)

const dataFeatures = data.features.filter((feature) => !!feature.properties.i_o_o)

dataFeatures.forEach((element) => {
	const keysToDelete = Object.keys(element.properties).filter((key) => key !== 'cell_zid')
	for (const key of keysToDelete) {
		delete element.properties[key]
	}
})

const output = {
	type: 'FeatureCollection',
	features: dataFeatures,
}

fs.writeFileSync('./output/school-problem-cells.json', JSON.stringify(output))
