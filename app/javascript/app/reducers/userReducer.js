import { userActions } from '../actions'

const { TYPES } = userActions

const initialState = {
  userInfo: {},
  token: null,
  isLoginModalOpen: false,
}

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.SET_USER_DATA:
      return {
        ...state,
        userInfo: payload,
        token: payload.token,
        isLoginModalOpen: false,
      }
    case TYPES.SHOW_LOGIN_MODAL:
      return { ...state, isLoginModalOpen: true }
    default:
      return state
  }
}

export default userReducer
