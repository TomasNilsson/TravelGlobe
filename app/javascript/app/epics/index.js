import { combineEpics } from 'redux-observable'
import createTripEpic from './createTripEpic'
import fetchCountriesEpic from './fetchCountriesEpic'
import fetchVisitedCountriesEpic from './fetchVisitedCountriesEpic'
import fetchMyTripsEpic from './fetchMyTripsEpic'
import fetchPlacesLivedEpic from './fetchPlacesLivedEpic'
import fetchStatisticsEpic from './fetchStatisticsEpic'
import showTripInfoEpic from './showTripInfoEpic'

const rootEpic = combineEpics(
  createTripEpic,
  fetchCountriesEpic,
  fetchVisitedCountriesEpic,
  fetchMyTripsEpic,
  fetchPlacesLivedEpic,
  fetchStatisticsEpic,
  showTripInfoEpic
)

export default rootEpic
