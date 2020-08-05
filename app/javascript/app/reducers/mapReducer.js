import { mapActions } from '../actions'

const { TYPES } = mapActions

const initialState = {
  markers: [],
  visitedCountries: [],
}

const mapReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.SET_MARKERS:
      return { ...state, markers: payload }
    case TYPES.REMOVE_MARKERS:
      return { ...state, markers: [] }
    case TYPES.FETCH_VISITED_COUNTRIES_SUCCESS:
      return { ...state, visitedCountries: payload }
    default:
      return state
  }
}

export default mapReducer
