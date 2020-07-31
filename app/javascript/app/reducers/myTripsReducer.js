import { myTripsActions } from '../actions'

const { TYPES } = myTripsActions

const initialState = {
  trips: [],
  isModalOpen: false,
}

const myTripsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.FETCH_MY_TRIPS_SUCCESS:
      return { ...state, trips: payload }
    case TYPES.TOGGLE_MY_TRIPS_MODAL:
      return { ...state, isModalOpen: !state.isModalOpen }
    default:
      return state
  }
}

export default myTripsReducer
