export class DataGenerator {
	static maxLat = 55.86
	static minLat = 55.61
	static maxLon = 37.8
	static minLon = 37.4

	static overPopulationHeatData() {
		const data: [number, number, number][] = []

		for (let i = 0; i < 1000; i++) {
			data.push([
				this.minLat + (this.maxLat - this.minLat) * Math.random(),
				this.minLon + (this.maxLon - this.minLon) * Math.random(),
				Math.random(),
			])
		}

		return data
	}
}
