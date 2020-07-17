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
      styles: [
        {
          featureType: 'all',
          elementType: 'all',
          stylers: [{ hue: '#3b5998' }, { saturation: -22 }],
        },
        {
          featureType: 'administrative',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'on' }, { color: '#3b5998' }],
        },
        {
          featureType: 'administrative.country',
          elementType: 'geometry.stroke',
          stylers: [{ visibility: 'simplified' }, { color: '#3b5998' }],
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [
            { visibility: 'on' },
            { color: '#f7f7f7' },
            { saturation: 10 },
            { lightness: 76 },
          ],
        },
        {
          featureType: 'landscape.natural',
          elementType: 'geometry',
          stylers: [{ color: '#f7f7f7' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'all',
          stylers: [{ color: '#8b9dc3' }, { visibility: 'simplified' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'road.local',
          elementType: 'geometry.fill',
          stylers: [{ color: '#8b9dc3' }],
        },
        {
          featureType: 'transit.line',
          elementType: 'all',
          stylers: [{ color: '#ffffff' }, { weight: 0.43 }],
        },
        {
          featureType: 'transit',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#3b5998' }],
        },
        {
          featureType: 'water',
          elementType: 'labels',
          stylers: [
            { color: '#3b5998' },
            { saturation: 10 },
            { lightness: 30 },
            { weight: 0.43 },
          ],
        },
      ],
      ...options,
    }}
  />
)

export default Map
