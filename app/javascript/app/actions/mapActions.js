export const TYPES = {
  SET_MARKERS: 'map/SET_MARKERS',
}

export const setMarkers = (markers) => ({
  type: TYPES.SET_MARKERS,
  payload: markers,
})
