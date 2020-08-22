export const TYPES = {
  FETCH_MY_TRIPS: 'myTrips/FETCH_MY_TRIPS',
  FETCH_MY_TRIPS_SUCCESS: 'myTrips/FETCH_MY_TRIPS_SUCCESS',
  FETCH_TRIP_INFO_SUCCESS: 'myTrips/FETCH_TRIP_INFO_SUCCESS',
  SHOW_TRIP_FORM: 'myTrips/SHOW_TRIP_FORM',
  SHOW_TRIP_INFO: 'myTrips/SHOW_TRIP_INFO',
  TOGGLE_MY_TRIPS_MODAL: 'myTrips/TOGGLE_MY_TRIPS_MODAL',
  TOGGLE_TRIP_INFO_SIDEBAR: 'myTrips/TOGGLE_TRIP_INFO_SIDEBAR',
  TOGGLE_TRIP_FORM_MODAL: 'myTrips/TOGGLE_TRIP_FORM_MODAL',
}

export const fetchMyTrips = () => ({
  type: TYPES.FETCH_MY_TRIPS,
})

export const fetchMyTripsSuccess = (trips) => ({
  type: TYPES.FETCH_MY_TRIPS_SUCCESS,
  payload: trips,
})

export const fetchTripInfoSuccess = (trip) => ({
  type: TYPES.FETCH_TRIP_INFO_SUCCESS,
  payload: trip,
})

export const showTripForm = (tripId) => ({
  type: TYPES.SHOW_TRIP_FORM,
  payload: tripId,
})

export const showTripInfo = (tripId) => ({
  type: TYPES.SHOW_TRIP_INFO,
  payload: tripId,
})

export const toggleMyTripsModal = () => ({
  type: TYPES.TOGGLE_MY_TRIPS_MODAL,
})

export const toggleTripInfoSidebar = () => ({
  type: TYPES.TOGGLE_TRIP_INFO_SIDEBAR,
})

export const toggleTripFormModal = () => ({
  type: TYPES.TOGGLE_TRIP_FORM_MODAL,
})
