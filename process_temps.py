import xarray as xr

# Load the NetCDF dataset
file_path = './noaa.nc'  # Replace with your dataset file path
dataset = xr.open_dataset(file_path)

# Extract the temperature anomaly variable
anom = dataset['anom']

# Compute the minimum and maximum temperature anomalies
min_temp_anomaly = anom.min().values
max_temp_anomaly = anom.max().values

print(f"Minimum Temperature Anomaly: {min_temp_anomaly}")
print(f"Maximum Temperature Anomaly: {max_temp_anomaly}")
