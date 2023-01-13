export const TYPES = {
  LOGIN: 'user/LOGIN',
  REFRESH_TOKEN: 'user/REFRESH_TOKEN',
  SET_USER_DATA: 'user/SET_USER_DATA',
  SHOW_LOGIN_MODAL: 'user/SHOW_LOGIN_MODAL',
}

export const login = (googleJwt) => ({
  type: TYPES.LOGIN,
  payload: googleJwt,
})

export const refreshToken = (token) => ({
  type: TYPES.REFRESH_TOKEN,
  payload: token,
})

export const setUserData = (userData) => ({
  type: TYPES.SET_USER_DATA,
  payload: userData,
})

export const showLoginModal = () => ({
  type: TYPES.SHOW_LOGIN_MODAL,
})
