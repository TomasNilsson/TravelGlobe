import { combineEpics } from 'redux-observable'
import createPlaceLivedEpic from './createPlaceLivedEpic'
import createTripEpic from './createTripEpic'
import fetchCountriesEpic from './fetchCountriesEpic'
import fetchVisitedCountriesEpic from './fetchVisitedCountriesEpic'
import fetchMyTripsEpic from './fetchMyTripsEpic'
import fetchPlacesLivedEpic from './fetchPlacesLivedEpic'
import fetchStatisticsEpic from './fetchStatisticsEpic'
import fetchTripInfoEpic from './fetchTripInfoEpic'
import updatePlaceLivedEpic from './updatePlaceLivedEpic'
import updateTripEpic from './updateTripEpic'

const rootEpic = combineEpics(
  createPlaceLivedEpic,
  createTripEpic,
  fetchCountriesEpic,
  fetchVisitedCountriesEpic,
  fetchMyTripsEpic,
  fetchPlacesLivedEpic,
  fetchStatisticsEpic,
  fetchTripInfoEpic,
  updatePlaceLivedEpic,
  updateTripEpic
)

export default rootEpic
