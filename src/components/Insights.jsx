const Insights = () => {
	return (
		<div className="p-6 bg-neutral-700 text-neutral-200 rounded-lg shadow-md h-[84vh] w-[19vw] border border-neutral-600 ml-1">
			<h2 className="text-2xl font-bold mb-2">🌍 What you Need to Know!</h2>
			<p className="mb-2">
				This expanded globe visualization demonstrates temperature anomalies across multiple years.
				You can view data as discrete points or as hex bins. The data here is based on the gridded
				NASA NOAAGLobalTemp dataset.
			</p>
			<p className="mb-2">
				<strong className="text-blue-200">Dataset:</strong>
				{
					' NOAAGlobalTemp combines the sea surface temperature (SST) with land surface air temperature (LSAT)'
				}
			</p>
			<p>
				<strong className="text-green-200">Motive:</strong> Visualizing global warming helps raise
				awareness, shows regional temperature shifts, and encourages exploring solutions for climate
				change mitigation.
			</p>
			<h2 className="text-2xl font-bold mb-2 mt-8">💡 Our Insight!</h2>
			<p className="mb-2">
				The Yearly Temperature Anomaly Distribution is important because not all areas of the Earth
				are warming equally, and not all areas respond the same to the warming. For example, the
				polar regions are warming faster than the global average, which accelerates the ice melt.
				Understanding regional temperature increases will be one of many crucial factors for our
				ability to deal with regional and global climate change disasters.
			</p>
		</div>
	)
}

export default Insights
