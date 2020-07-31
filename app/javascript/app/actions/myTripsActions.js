export const TYPES = {
  FETCH_MY_TRIPS: 'myTrips/FETCH_MY_TRIPS',
  FETCH_MY_TRIPS_SUCCESS: 'myTrips/FETCH_MY_TRIPS_SUCCESS',
  TOGGLE_MY_TRIPS_MODAL: 'myTrips/TOGGLE_MY_TRIPS_MODAL',
}

export const fetchMyTrips = () => ({
  type: TYPES.FETCH_MY_TRIPS,
})

export const fetchMyTripsSuccess = (trips) => ({
  type: TYPES.FETCH_MY_TRIPS_SUCCESS,
  payload: trips,
})

export const toggleMyTripsModal = () => ({
  type: TYPES.TOGGLE_MY_TRIPS_MODAL,
})
