import { placesLivedActions } from '../actions'

const { TYPES } = placesLivedActions

const initialState = {
  places: [],
}

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.FETCH_PLACES_LIVED_SUCCESS:
      return { ...state, places: payload }
    default:
      return state
  }
}

export default userReducer
