import { combineReducers } from 'redux'
import mapReducer from './mapReducer'
import myTripsReducer from './myTripsReducer'
import placesLivedReducer from './placesLivedReducer'
import userReducer from './userReducer'

export default combineReducers({
  map: mapReducer,
  myTrips: myTripsReducer,
  placesLived: placesLivedReducer,
  user: userReducer,
})
