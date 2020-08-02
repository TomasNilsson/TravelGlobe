import { myTripsActions } from '../actions'

const { TYPES } = myTripsActions

const initialState = {
  trips: [],
  isMyTripsModalOpen: false,
  isTripInfoSidebarOpen: false,
  selectedTripId: null,
}

const myTripsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.FETCH_MY_TRIPS_SUCCESS:
      return { ...state, trips: payload }
    case TYPES.FETCH_TRIP_INFO_SUCCESS:
      return {
        ...state,
        trips: state.trips.map((trip) =>
          trip.id === payload.id ? payload : trip
        ),
      }
    case TYPES.SHOW_TRIP_INFO:
      return {
        ...state,
        selectedTripId: payload,
        isMyTripsModalOpen: false,
        isTripInfoSidebarOpen: true,
      }
    case TYPES.TOGGLE_MY_TRIPS_MODAL:
      return { ...state, isMyTripsModalOpen: !state.isMyTripsModalOpen }
    case TYPES.TOGGLE_TRIP_INFO_SIDEBAR:
      return { ...state, isTripInfoSidebarOpen: !state.isTripInfoSidebarOpen }
    default:
      return state
  }
}

export default myTripsReducer
