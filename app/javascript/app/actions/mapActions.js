export const TYPES = {
  MAPS_API_LOADED: 'map/MAPS_API_LOADED',
  SET_MARKERS: 'map/SET_MARKERS',
  REMOVE_MARKERS: 'map/REMOVE_MARKERS',
  FETCH_COUNTRIES: 'map/FETCH_COUNTRIES',
  FETCH_COUNTRIES_SUCCESS: 'map/FETCH_COUNTRIES_SUCCESS',
  FETCH_VISITED_COUNTRIES: 'map/FETCH_VISITED_COUNTRIES',
  FETCH_VISITED_COUNTRIES_SUCCESS: 'map/FETCH_VISITED_COUNTRIES_SUCCESS',
}

export const mapsApiLoaded = () => ({
  type: TYPES.MAPS_API_LOADED,
})

export const setMarkers = (markers) => ({
  type: TYPES.SET_MARKERS,
  payload: markers,
})

export const removeMarkers = () => ({
  type: TYPES.REMOVE_MARKERS,
})

export const fetchCountries = () => ({
  type: TYPES.FETCH_COUNTRIES,
})

export const fetchCountriesSuccess = (countries) => ({
  type: TYPES.FETCH_COUNTRIES_SUCCESS,
  payload: countries,
})

export const fetchVisitedCountries = () => ({
  type: TYPES.FETCH_VISITED_COUNTRIES,
})

export const fetchVisitedCountriesSuccess = (countries) => ({
  type: TYPES.FETCH_VISITED_COUNTRIES_SUCCESS,
  payload: countries,
})
