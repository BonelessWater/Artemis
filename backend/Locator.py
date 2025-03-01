import geocoder

def get_loc():
    g = geocoder.ip('me')
    if g.ok:
        print("Latitude:", g.latlng[0], "Longitude:", g.latlng[1])
        return [g.latlng[0], g.latlng[1]]
    else:
        error = "Could not determine location"
        return error

#? For android phones; not implimented for testing purposes
'''
from plyer import gps

def on_location(**kwargs):
    # kwargs will include 'lat' and 'lon'
    print("Latitude: {lat}, Longitude: {lon}".format(**kwargs))

def on_status(status):
    print("GPS status:", status)

# Configure the GPS callback functions
gps.configure(on_location=on_location, on_status=on_status)

# Start the GPS sensor (minTime in milliseconds, minDistance in meters)
try:
    gps.start(minTime=1000, minDistance=0)
except NotImplementedError:
    print("GPS not implemented on this platform")
'''
