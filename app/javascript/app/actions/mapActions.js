export const TYPES = {
  SET_MARKERS: 'map/SET_MARKERS',
  FETCH_VISITED_COUNTRIES: 'map/FETCH_VISITED_COUNTRIES',
  FETCH_VISITED_COUNTRIES_SUCCESS: 'map/FETCH_VISITED_COUNTRIES_SUCCESS',
}

export const setMarkers = (markers) => ({
  type: TYPES.SET_MARKERS,
  payload: markers,
})

export const fetchVisitedCountries = () => ({
  type: TYPES.FETCH_VISITED_COUNTRIES,
})

export const fetchVisitedCountriesSuccess = (countries) => ({
  type: TYPES.FETCH_VISITED_COUNTRIES_SUCCESS,
  payload: countries,
})
