import { placesLivedActions } from '../actions'

const { TYPES } = placesLivedActions

const initialState = {
  places: [],
  isModalOpen: false,
  selectedPlaceId: null,
}

const placesLivedReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.FETCH_PLACES_LIVED_SUCCESS:
      return { ...state, places: payload }
    case TYPES.SET_SELECTED_PLACE_ID:
      return { ...state, selectedPlaceId: payload, isModalOpen: false }
    case TYPES.TOGGLE_PLACES_LIVED_MODAL:
      return { ...state, isModalOpen: !state.isModalOpen }
    default:
      return state
  }
}

export default placesLivedReducer
