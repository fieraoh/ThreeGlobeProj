/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import ThreeGlobe from 'three-globe'

// d3-scale for color
import { scaleSequential } from 'd3-scale'
import { interpolateTurbo } from 'd3-scale-chromatic'

// Adjust domain to match typical anomalies in your dataset
const colorScale = scaleSequential(interpolateTurbo).domain([-8, 8])

const GlobeComponent = ({ globeRef, yearData, viewMode }) => {
	useEffect(() => {
		if (!globeRef.current) return

		// Create globe if none present yet
		if (!globeRef.current.__globe) {
			const globe = new ThreeGlobe()
				.globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
				.bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
			globeRef.current.add(globe)
			globeRef.current.__globe = globe
		}

		const globeInstance = globeRef.current.__globe

		// Clear data if no yearData
		if (!yearData || yearData.length === 0) {
			globeInstance.pointsData([])
			globeInstance.hexBinPointsData([])
			return
		}

		if (viewMode === 'points') {
			// POINTS MODE
			globeInstance
				.pointsData(yearData) // Array of { lat, lng, temperature }
				.pointLat('lat')
				.pointLng('lng')
				.pointAltitude(0.03)
				.pointRadius(0.6)
				.pointColor((d) => colorScale(d.temperature))

			// Clear any previous hex data
			globeInstance.hexBinPointsData([])
		} else {
			// Hex bins
			// Here we visualize as hex pins
			globeInstance
				.hexBinPointsData(yearData) // same array
				.hexBinPointWeight('temperature') // each point's "weight"
				.hexAltitude((d) => d.sumWeight * 0.01) // scale altitude by temp
				.hexBinResolution(4) // higher => smaller hex areas
				.hexTopColor((d) => colorScale(d.sumWeight))
				.hexSideColor(() => 'rgba(255, 255, 255, 0.5)')
				.hexTransitionDuration(1000)

			// Clear any previous points data
			globeInstance.pointsData([])
		}
	}, [globeRef, yearData, viewMode])

	return null
}

export default GlobeComponent
