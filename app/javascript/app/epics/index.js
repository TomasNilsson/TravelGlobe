import { combineEpics } from 'redux-observable'
import createPlaceLivedEpic from './createPlaceLivedEpic'
import createTripEpic from './createTripEpic'
import fetchCategoriesEpic from './fetchCategoriesEpic'
import fetchCountriesEpic from './fetchCountriesEpic'
import fetchVisitedCountriesEpic from './fetchVisitedCountriesEpic'
import fetchMyTripsEpic from './fetchMyTripsEpic'
import fetchPlacesLivedEpic from './fetchPlacesLivedEpic'
import fetchStatisticsEpic from './fetchStatisticsEpic'
import fetchTravelPartnersEpic from './fetchTravelPartnersEpic'
import fetchTripInfoEpic from './fetchTripInfoEpic'
import updatePlaceLivedEpic from './updatePlaceLivedEpic'
import updateTripEpic from './updateTripEpic'

const rootEpic = combineEpics(
  createPlaceLivedEpic,
  createTripEpic,
  fetchCategoriesEpic,
  fetchCountriesEpic,
  fetchVisitedCountriesEpic,
  fetchMyTripsEpic,
  fetchPlacesLivedEpic,
  fetchStatisticsEpic,
  fetchTravelPartnersEpic,
  fetchTripInfoEpic,
  updatePlaceLivedEpic,
  updateTripEpic
)

export default rootEpic
