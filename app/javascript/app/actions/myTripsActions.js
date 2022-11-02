export const TYPES = {
  ADD_TRIP: 'myTrips/ADD_TRIP',
  ADD_TRIP_SUCCESS: 'myTrips/ADD_TRIP_SUCCESS',
  FETCH_MY_TRIPS: 'myTrips/FETCH_MY_TRIPS',
  FETCH_MY_TRIPS_SUCCESS: 'myTrips/FETCH_MY_TRIPS_SUCCESS',
  FETCH_TRAVEL_PARTNERS: 'myTrips/FETCH_TRAVEL_PARTNERS',
  FETCH_TRAVEL_PARTNERS_SUCCESS: 'myTrips/FETCH_TRAVEL_PARTNERS_SUCCESS',
  FETCH_TRIP_INFO_SUCCESS: 'myTrips/FETCH_TRIP_INFO_SUCCESS',
  UPDATE_TRIP: 'myTrips/UPDATE_TRIP',
  UPDATE_TRIP_SUCCESS: 'myTrips/UPDATE_TRIP_SUCCESS',
  SHOW_TRIP_FORM: 'myTrips/SHOW_TRIP_FORM',
  SHOW_TRIP_INFO: 'myTrips/SHOW_TRIP_INFO',
  TOGGLE_MY_TRIPS_MODAL: 'myTrips/TOGGLE_MY_TRIPS_MODAL',
  TOGGLE_TRIP_INFO_SIDEBAR: 'myTrips/TOGGLE_TRIP_INFO_SIDEBAR',
  TOGGLE_TRIP_FORM_MODAL: 'myTrips/TOGGLE_TRIP_FORM_MODAL',
}

export const addTrip = (trip) => ({
  type: TYPES.ADD_TRIP,
  payload: trip,
})

export const addTripSuccess = (trip) => ({
  type: TYPES.ADD_TRIP_SUCCESS,
  payload: trip,
})

export const fetchMyTrips = () => ({
  type: TYPES.FETCH_MY_TRIPS,
})

export const fetchMyTripsSuccess = (trips) => ({
  type: TYPES.FETCH_MY_TRIPS_SUCCESS,
  payload: trips,
})

export const fetchTravelPartners = () => ({
  type: TYPES.FETCH_TRAVEL_PARTNERS,
})

export const fetchTravelPartnersSuccess = (travelPartners) => ({
  type: TYPES.FETCH_TRAVEL_PARTNERS_SUCCESS,
  payload: travelPartners,
})

export const fetchTripInfoSuccess = (trip) => ({
  type: TYPES.FETCH_TRIP_INFO_SUCCESS,
  payload: trip,
})

export const updateTrip = (trip) => ({
  type: TYPES.UPDATE_TRIP,
  payload: trip,
})

export const updateTripSuccess = (trip) => ({
  type: TYPES.UPDATE_TRIP_SUCCESS,
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

export const toggleMyTripsModal = (searchString) => ({
  type: TYPES.TOGGLE_MY_TRIPS_MODAL,
  payload: searchString,
})

export const toggleTripInfoSidebar = () => ({
  type: TYPES.TOGGLE_TRIP_INFO_SIDEBAR,
})

export const toggleTripFormModal = () => ({
  type: TYPES.TOGGLE_TRIP_FORM_MODAL,
})
