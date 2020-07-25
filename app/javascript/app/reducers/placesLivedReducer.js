import { placesLivedActions } from '../actions'

const { TYPES } = placesLivedActions

const initialState = {
  places: [],
  isModalOpen: false,
}

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.FETCH_PLACES_LIVED_SUCCESS:
      return { ...state, places: payload }
    case TYPES.TOGGLE_PLACES_LIVED_MODAL:
      return { ...state, isModalOpen: !state.isModalOpen }
    default:
      return state
  }
}

export default userReducer
