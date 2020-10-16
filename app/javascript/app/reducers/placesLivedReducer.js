import { placesLivedActions } from '../actions'

const { TYPES } = placesLivedActions

const initialState = {
  places: [],
  isPlacesLivedModalOpen: false,
  isPlaceLivedFormModalOpen: false,
  selectedPlaceId: null,
}

const placesLivedReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.ADD_PLACE_LIVED_SUCCESS:
      return {
        ...state,
        places: [...state.places, payload],
        isPlaceLivedFormModalOpen: false,
      }
    case TYPES.FETCH_PLACES_LIVED_SUCCESS:
      return { ...state, places: payload }
    case TYPES.SET_SELECTED_PLACE_ID:
      return {
        ...state,
        selectedPlaceId: payload,
        isPlacesLivedModalOpen: false,
      }
    case TYPES.SHOW_PLACES_LIVED_FORM:
      return {
        ...state,
        selectedPlaceId: payload,
        isPlacesLivedModalOpen: false,
        isPlaceLivedFormModalOpen: true,
      }
    case TYPES.TOGGLE_PLACES_LIVED_MODAL:
      return { ...state, isPlacesLivedModalOpen: !state.isPlacesLivedModalOpen }
    case TYPES.TOGGLE_PLACES_LIVED_FORM_MODAL:
      return {
        ...state,
        isPlaceLivedFormModalOpen: !state.isPlaceLivedFormModalOpen,
      }
    case TYPES.UPDATE_PLACE_LIVED_SUCCESS:
      return {
        ...state,
        places: state.places.map((place) => ({
          ...place,
          ...(place.id === payload.id && payload),
        })),
        isPlaceLivedFormModalOpen: false,
      }
    default:
      return state
  }
}

export default placesLivedReducer
