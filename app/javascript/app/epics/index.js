import { combineEpics } from 'redux-observable'
import fetchVisitedCountriesEpic from './fetchVisitedCountriesEpic'

const rootEpic = combineEpics(fetchVisitedCountriesEpic)

export default rootEpic
