const getMyTripsState = (state) => state.myTrips

export const getMyTrips = (state) => getMyTripsState(state).trips

export const getTripInfoById = (state, tripId) =>
  getMyTrips(state).find((trip) => trip.id === tripId) || {}

export const getSelectedTripId = (state) =>
  getMyTripsState(state).selectedTripId

export const getTripInfoForSelectedId = (state) =>
  getTripInfoById(state, getSelectedTripId(state))

export const getIsMyTripsModalOpen = (state) =>
  getMyTripsState(state).isMyTripsModalOpen

export const getIsTripInfoSidebarOpen = (state) =>
  getMyTripsState(state).isTripInfoSidebarOpen
