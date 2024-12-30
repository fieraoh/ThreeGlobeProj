const Insights = () => {
	return (
		<div className="p-6 bg-neutral-700 text-neutral-200 rounded-lg shadow-md h-[84vh] w-[19vw] border border-neutral-600 ml-1">
			<h2 className="text-2xl font-bold mb-2">What you need to know!</h2>
			<p className="mb-2">
				This expanded globe visualization demonstrates temperature anomalies across multiple years.
				You can view data as discrete points or as a heatmap using hex bins. The data here is a
				mocked dataset simulating NASA-like temperature anomalies.
			</p>
			<p className="mb-2">
				<strong>Dataset:</strong> A custom dataset containing multiple lat/long points for each
				year. Real-world data might be fetched from NASA, NOAA, or other climate data sources.
			</p>
			<p className="mb-2">
				<strong>Motive:</strong> Visualizing global warming helps raise awareness, shows regional
				temperature shifts, and encourages exploring solutions for climate change mitigation.
			</p>
		</div>
	)
}

export default Insights
