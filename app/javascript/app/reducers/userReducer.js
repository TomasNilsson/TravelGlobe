import { userActions } from '../actions'

const { TYPES } = userActions

const initialState = {
  id: '',
  name: '',
  imageUrl: '',
  email: '',
}

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.SET_USER_DATA:
      return { ...state, ...payload }
    default:
      return state
  }
}

export default userReducer
