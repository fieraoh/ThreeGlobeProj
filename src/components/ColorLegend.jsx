import { scaleSequential } from 'd3-scale'
import { interpolateTurbo } from 'd3-scale-chromatic'

const colorScale = scaleSequential(interpolateTurbo).domain([-8, 8])

const ColorLegend = () => {
	const numSteps = 16
	const stepValues = Array.from({ length: numSteps }, (_, i) => {
		return -8 + (i * 16) / (numSteps - 1)
	})

	return (
		<div className="flex items-center space-x-4 p-4">
			{/* Minimum label */}
			<span className="font-bold text-sm">-8</span>

			{/* The discrete color boxes */}
			<div className="flex space-x-0.5">
				{stepValues.map((val, idx) => {
					const color = colorScale(val)
					return <div key={idx} className="w-5 h-5" style={{ backgroundColor: color }} />
				})}
			</div>

			{/* Maximum label */}
			<span className="font-bold text-sm">+8</span>
		</div>
	)
}

export default ColorLegend
