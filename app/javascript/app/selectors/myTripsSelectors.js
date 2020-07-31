const getMyTripsState = (state) => state.myTrips

export const getMyTrips = (state) => getMyTripsState(state).trips

export const getIsMyTripsModalOpen = (state) =>
  getMyTripsState(state).isModalOpen
