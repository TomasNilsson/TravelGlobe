const getMapState = (state) => state.map

export const getMarkers = (state) => getMapState(state).markers

export const getHouseMarkers = (state) => getMapState(state).houseMarkers
