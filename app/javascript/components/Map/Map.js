import React, { useState } from 'react'
import GoogleMap from 'google-map-react'
import { GoogleMapsOverlay as DeckOverlay } from '@deck.gl/google-maps'
import { GeoJsonLayer } from '@deck.gl/layers'
import MapSearchBox from '../MapSearchBox'

// GeoJSON from Natural Earth via http://geojson.xyz
const COUNTRIES_GEOJSON_URL =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'
const US_STATES_GEOJSON_URL =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces.geojson'

const Map = ({
  center = { lat: 30, lng: 25 },
  zoom = 3,
  options = {},
  highlightedCountries = [],
}) => {
  const [mapInstance, setMapInstance] = useState(null)
  const [mapsApi, setMapsApi] = useState(null)

  const handleApiLoaded = (map, maps) => {
    setMapInstance(map)
    setMapsApi(maps)

    const deckOverlay = new DeckOverlay({
      layers: [
        new GeoJsonLayer({
          id: 'countries',
          data: COUNTRIES_GEOJSON_URL,
          dataTransform: (data) =>
            data.features.filter((country) =>
              highlightedCountries.includes(country.properties.iso_a2)
            ),
          getFillColor: [0, 255, 0, 100],
        }),
        new GeoJsonLayer({
          id: 'states',
          data: US_STATES_GEOJSON_URL,
          dataTransform: (data) =>
            data.features.filter((state) =>
              highlightedCountries.includes(state.properties.iso_3166_2)
            ),
          getFillColor: [0, 255, 0, 100],
        }),
      ],
    })

    deckOverlay.setMap(map)
  }

  return (
    <>
      <GoogleMap
        bootstrapURLKeys={{
          key: process.env.GOOGLE_MAPS_API_KEY,
          libraries: ['places'],
        }}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
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
      <MapSearchBox mapsApi={mapsApi} map={mapInstance} />
    </>
  )
}

export default Map
