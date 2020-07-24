import { mapActions } from '../actions'

const { TYPES } = mapActions

const initialState = {
  markers: [],
  houseMarkers: [],
}

const mapReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.SET_MARKERS:
      return { ...state, markers: payload }
    case TYPES.SET_HOUSE_MARKERS:
      return { ...state, houseMarkers: payload }
    default:
      return state
  }
}

export default mapReducer
