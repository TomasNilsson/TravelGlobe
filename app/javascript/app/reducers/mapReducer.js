import { mapActions } from '../actions'

const { TYPES } = mapActions

const initialState = {
  markers: [],
  houseMarkers: [],
  visitedCountries: [],
}

const mapReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.SET_MARKERS:
      return { ...state, markers: payload }
    case TYPES.SET_HOUSE_MARKERS:
      return { ...state, houseMarkers: payload }
    case TYPES.FETCH_VISITED_COUNTRIES_SUCCESS:
      return { ...state, visitedCountries: payload }
    default:
      return state
  }
}

export default mapReducer
