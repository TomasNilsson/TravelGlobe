const getMapState = (state) => state.map

export const getIsMapsApiLoaded = (state) => getMapState(state).isMapsApiLoaded

export const getMarkers = (state) => getMapState(state).markers

export const getCountries = (state) => getMapState(state).countries

export const getVisitedCountries = (state) =>
  getMapState(state).visitedCountries
