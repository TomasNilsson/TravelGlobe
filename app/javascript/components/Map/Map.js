import React from 'react'
import GoogleMap from 'google-map-react'

const Map = ({ center = { lat: 30, lng: 25 }, zoom = 3, options = {} }) => (
  <GoogleMap
    bootstrapURLKeys={{
      key: process.env.GOOGLE_MAPS_API_KEY,
    }}
    defaultCenter={center}
    defaultZoom={zoom}
    options={{
      minZoom: 3,
      maxZoom: 9,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      keyboardShortcuts: false,
      restriction: {
        latLngBounds: {
          north: 85,
          south: -85,
          west: -180,
          east: 180,
        },
        strictBounds: true,
      },
      ...options,
    }}
  />
)

export default Map
