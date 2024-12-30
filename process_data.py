import xarray as xr
import pandas as pd

# Load the NetCDF dataset
file_path = 'dataset.nc'
dataset = xr.open_dataset("./noaa.nc")

# Extract variables
anom = dataset['anom']
latitudes = dataset['lat'].values
longitudes = dataset['lon'].values
time = dataset['time']

# Convert time to pandas datetime and extract years
years = pd.to_datetime(time.values).year

# Filter to only include years after 2000
time_indices_after_2000 = [i for i, year in enumerate(years) if year > 2020]
filtered_years = years[time_indices_after_2000]

# Select the surface layer (z = 0)
anom_surface = anom.isel(z=0)

# Initialize a list to store the data
output_data = []

# Loop through the filtered years and extract data
for i in time_indices_after_2000:
    year = years[i]
    yearly_anomalies = anom_surface.isel(time=i).values
    for lat_idx, lat in enumerate(latitudes):
        for lon_idx, lon in enumerate(longitudes):
            temp_anomaly = yearly_anomalies[lat_idx, lon_idx]
            # Skip missing data (NaN values)
            if not pd.isnull(temp_anomaly):
                # Adjust longitude to be in the range [-180, 180]
                adjusted_lon = lon - 360 if lon > 180 else lon
                output_data.append({
                    "year": int(year),
                    "lat": float(lat),
                    "lng": float(adjusted_lon),
                    "tempAnomaly": float(temp_anomaly)
                })

# Convert the list to a DataFrame for easier export
output_df = pd.DataFrame(output_data)

# Save as a JavaScript file in the required format
output_js_path = './src/assets/data.js'
with open(output_js_path, 'w') as js_file:
    js_file.write("export default " + output_df.to_json(orient='records', indent=4) + ";")

print(f"Filtered data (years > 2000) has been exported to {output_js_path}")
