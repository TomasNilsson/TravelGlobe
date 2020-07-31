import { combineEpics } from 'redux-observable'
import fetchVisitedCountriesEpic from './fetchVisitedCountriesEpic'
import fetchMyTripsEpic from './fetchMyTripsEpic'
import fetchPlacesLivedEpic from './fetchPlacesLivedEpic'

const rootEpic = combineEpics(
  fetchVisitedCountriesEpic,
  fetchMyTripsEpic,
  fetchPlacesLivedEpic
)

export default rootEpic
