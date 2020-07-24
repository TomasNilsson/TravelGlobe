export const TYPES = {
  SET_MARKERS: 'map/SET_MARKERS',
  SET_HOUSE_MARKERS: 'map/SET_HOUSE_MARKERS',
}

export const setMarkers = (markers) => ({
  type: TYPES.SET_MARKERS,
  payload: markers,
})

export const setHouseMarkers = (markers) => ({
  type: TYPES.SET_HOUSE_MARKERS,
  payload: markers,
})
