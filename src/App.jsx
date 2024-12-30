import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import CameraControls from './components/CameraControls'
import Scene from './components/Scene'
import YearSlider from './components/YearSlider'
import Insights from './components/Insights'
import ColorLegend from './components/ColorLegend.jsx'

import globalTemps from './assets/data.js'

function App() {
	// We'll figure out the min/max years from the dataset
	const [minYear, setMinYear] = useState(2000)
	const [maxYear, setMaxYear] = useState(2011)
	const [selectedYear, setSelectedYear] = useState(2000)

	// Store an object keyed by year => array of { lat, lng, temperature }
	const [dataByYear, setDataByYear] = useState({})

	// Toggle between "points" and "heatmap"
	const [viewMode, setViewMode] = useState('points')

	useEffect(() => {
		// Group the array into a dictionary keyed by year
		const yearMap = {}
		globalTemps.forEach((item) => {
			const { year, lat, lng, tempAnomaly } = item
			if (!yearMap[year]) {
				yearMap[year] = []
			}
			yearMap[year].push({ lat, lng, temperature: tempAnomaly })
		})

		// Determine min and max year in the data
		const allYears = Object.keys(yearMap).map((y) => Number(y))
		const actualMin = Math.min(...allYears)
		const actualMax = Math.max(...allYears)

		setDataByYear(yearMap)
		setMinYear(actualMin)
		setMaxYear(actualMax)
		// Optionally, set the default selection to the first available year:
		setSelectedYear(actualMin)
	}, [])

	// Grab the data array for the currently selected year
	const yearData = dataByYear[selectedYear] || []

	// Handler to toggle the globe's view mode
	const handleToggleView = () => {
		setViewMode((prev) => (prev === 'points' ? 'heatmap' : 'points'))
	}

	return (
		<div className="w-full min-h-screen flex flex-row">
			<div className="flex flex-col">
				{/* Title / Navbar */}
				<header className="bg-neutral-700 text-stone-200 text-center rounded-t-lg py-1 border-b border-neutral-500">
					<h1 className="text-2xl font-bold">Global Surface Temperature Anomalies Visualization</h1>
				</header>

				{/* 3D Globe Section */}
				<div className="bg-black h-[80vh] w-[80vw]">
					<Canvas>
						<CameraControls />
						<Scene yearData={yearData} viewMode={viewMode} />
					</Canvas>
				</div>

				{/* Controls */}
				<div className="flex items-center justify-center">
					<ColorLegend />
					<div className="flex flex-col justify-center items-center">
						<YearSlider
							minYear={minYear}
							maxYear={maxYear}
							selectedYear={selectedYear}
							onYearChange={setSelectedYear}
						/>
						<button onClick={handleToggleView}>
							Switch to {viewMode === 'points' ? 'Heatmap' : 'Points'}
						</button>
					</div>
				</div>
			</div>

			{/* Insights Section */}
			<Insights />
		</div>
	)
}

export default App
