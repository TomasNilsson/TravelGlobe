import { combineReducers } from 'redux'
import mapReducer from './mapReducer'
import placesLivedReducer from './placesLivedReducer'
import userReducer from './userReducer'

export default combineReducers({
  map: mapReducer,
  placesLived: placesLivedReducer,
  user: userReducer,
})
