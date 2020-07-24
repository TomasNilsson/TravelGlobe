import { combineEpics } from 'redux-observable'
import fetchVisitedCountriesEpic from './fetchVisitedCountriesEpic'
import fetchPlacesLivedEpic from './fetchPlacesLivedEpic'

const rootEpic = combineEpics(fetchVisitedCountriesEpic, fetchPlacesLivedEpic)

export default rootEpic
