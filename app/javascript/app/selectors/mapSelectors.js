const getMapState = (state) => state.map

export const getMarkers = (state) => getMapState(state).markers

export const getVisitedCountries = (state) =>
  getMapState(state).visitedCountries
