/* eslint-disable react/prop-types */

const YearSlider = ({ minYear, maxYear, selectedYear, onYearChange }) => {
	const handleChange = (e) => {
		onYearChange(Number(e.target.value))
	}

	return (
		<div className="flex flex-col items-center space-y-2 p-4">
			<label htmlFor="yearSlider" className="font-bold">
				Select Year
			</label>
			<input
				type="range"
				id="yearSlider"
				min={minYear}
				max={maxYear}
				value={selectedYear}
				onChange={handleChange}
				className="w-64 accent-indigo-500"
			/>
			<span className="text-xl font-semibold">{selectedYear}</span>
		</div>
	)
}

export default YearSlider
