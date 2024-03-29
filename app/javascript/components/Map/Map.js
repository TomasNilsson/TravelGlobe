import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GoogleMap from 'google-map-react'
import { GoogleMapsOverlay as DeckOverlay } from '@deck.gl/google-maps'
import { GeoJsonLayer } from '@deck.gl/layers'
import { mapSelectors, placesLivedSelectors } from '../../app/selectors'
import { mapActions, myTripsActions } from '../../app/actions'
import MapSearchBox from '../MapSearchBox'
import MapMarker from '../MapMarker'

// GeoJSON from Natural Earth via http://geojson.xyz
const COUNTRIES_GEOJSON_URL =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'
const US_STATES_GEOJSON_URL =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces.geojson'

const ZOOM_LEVEL_SHOW_DETAILS = 7

const Map = ({ center = { lat: 30, lng: 25 }, zoom = 3, options = {} }) => {
  const mapRef = useRef(null)
  const mapsApiRef = useRef(null)
  const overlayRef = useRef(null)

  const isMapsApiLoaded = useSelector(mapSelectors.getIsMapsApiLoaded)
  const visitedCountries = useSelector(mapSelectors.getVisitedCountries)
  const placesLived = useSelector(placesLivedSelectors.getPlacesLived)
  const selectedPlaceLived = useSelector(
    placesLivedSelectors.getPlaceInfoForSelectedId
  )
  const markers = useSelector(mapSelectors.getMarkers)

  const dispatch = useDispatch()
  const onMapSearchSelect = ({ latitude, longitude, name }) =>
    dispatch(
      mapActions.setMarkers([{ lat: latitude, lng: longitude, text: name }])
    )
  const onOverlayClick = ({ object }) => {
    const country = object?.properties?.name
    if (country) {
      dispatch(myTripsActions.toggleMyTripsModal(country))
    }
  }

  useEffect(() => {
    // Show overlay with visited countries colored
    if (visitedCountries?.length > 0 && isMapsApiLoaded) {
      if (overlayRef.current) {
        // Remove old overlay and release all underlying resources
        overlayRef.current.finalize()
      }
      overlayRef.current = new DeckOverlay({
        layers: [
          new GeoJsonLayer({
            id: 'countries',
            data: COUNTRIES_GEOJSON_URL,
            dataTransform: (data) => {
              return data.features.filter((country) =>
                visitedCountries.includes(country.properties.iso_a2)
              )
            },
            getFillColor: [0, 255, 0, 100],
            pickable: true,
          }),
          new GeoJsonLayer({
            id: 'states',
            data: US_STATES_GEOJSON_URL,
            dataTransform: (data) =>
              data.features.filter((state) =>
                visitedCountries.includes(state.properties.iso_3166_2)
              ),
            getFillColor: [0, 255, 0, 100],
            pickable: true,
          }),
        ],
        onClick: onOverlayClick,
      })
      overlayRef.current.setMap(mapRef.current)
    }
  }, [visitedCountries, isMapsApiLoaded])

  useEffect(() => {
    // Adjust the map position and zoom level to show all markers
    if (markers.length > 0 && mapsApiRef.current && mapRef.current) {
      const bounds = new mapsApiRef.current.LatLngBounds()
      markers.forEach(({ lat, lng }) => bounds.extend({ lat, lng }))
      mapRef.current.fitBounds(bounds, 150)
      if (mapRef.current.getZoom() > ZOOM_LEVEL_SHOW_DETAILS) {
        mapRef.current.setZoom(ZOOM_LEVEL_SHOW_DETAILS)
      }
    }
  }, [markers])

  useEffect(() => {
    // Adjust the map position and zoom level to show selected place
    if (selectedPlaceLived && mapRef.current) {
      mapRef.current.setCenter({
        lat: selectedPlaceLived.latitude,
        lng: selectedPlaceLived.longitude,
      })
      mapRef.current.setZoom(ZOOM_LEVEL_SHOW_DETAILS)
    }
  }, [selectedPlaceLived])

  const handleApiLoaded = (map, maps) => {
    mapRef.current = map
    mapsApiRef.current = maps
    dispatch(mapActions.mapsApiLoaded())
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
          gestureHandling: 'greedy',
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
      >
        {placesLived.map((place) => (
          <MapMarker
            lat={place.latitude}
            lng={place.longitude}
            text={place.address}
            icon="house"
            key={place.id}
          />
        ))}
        {markers.map((marker, i) => (
          <MapMarker
            {...marker}
            label={markers.length > 1 ? i + 1 : ''}
            key={marker.text}
          />
        ))}
      </GoogleMap>
      <MapSearchBox onSelect={onMapSearchSelect} />
    </>
  )
}

export default Map
