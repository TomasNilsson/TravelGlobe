import { statisticsActions } from '../actions'

const { TYPES } = statisticsActions

const initialState = {
  numberOfTrips: 0,
  numberOfVisitedCountries: 0,
  numberOfDaysTravelling: 0,
  numberOfPlacesLived: 0,
  travelPartnersTopList: [],
  isModalOpen: false,
}

const statisticsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.FETCH_STATISTICS_SUCCESS:
      return {
        ...state,
        ...payload,
      }
    case TYPES.TOGGLE_STATISTICS_MODAL:
      return { ...state, isModalOpen: !state.isModalOpen }
    default:
      return state
  }
}

export default statisticsReducer
