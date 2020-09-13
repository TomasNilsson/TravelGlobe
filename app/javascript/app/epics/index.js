import { combineEpics } from 'redux-observable'
import createTripEpic from './createTripEpic'
import fetchCountriesEpic from './fetchCountriesEpic'
import fetchVisitedCountriesEpic from './fetchVisitedCountriesEpic'
import fetchMyTripsEpic from './fetchMyTripsEpic'
import fetchPlacesLivedEpic from './fetchPlacesLivedEpic'
import fetchStatisticsEpic from './fetchStatisticsEpic'
import fetchTripInfoEpic from './fetchTripInfoEpic'
import updateTripEpic from './updateTripEpic'

const rootEpic = combineEpics(
  createTripEpic,
  fetchCountriesEpic,
  fetchVisitedCountriesEpic,
  fetchMyTripsEpic,
  fetchPlacesLivedEpic,
  fetchStatisticsEpic,
  fetchTripInfoEpic,
  updateTripEpic
)

export default rootEpic
