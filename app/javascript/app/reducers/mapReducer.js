import { mapActions } from '../actions'

const { TYPES } = mapActions

const initialState = {
  markers: [],
}

const mapReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.SET_MARKERS:
      return { ...state, markers: payload }
    default:
      return state
  }
}

export default mapReducer
