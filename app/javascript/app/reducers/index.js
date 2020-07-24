import { combineReducers } from 'redux'
import mapReducer from './mapReducer'
import userReducer from './userReducer'

export default combineReducers({
  map: mapReducer,
  user: userReducer,
})
