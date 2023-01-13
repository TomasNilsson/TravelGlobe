export const TYPES = {
  LOGIN: 'user/LOGIN',
  SET_USER_DATA: 'user/SET_USER_DATA',
}

export const login = (googleJwt) => ({
  type: TYPES.LOGIN,
  payload: googleJwt
})

export const setUserData = (userData) => ({
  type: TYPES.SET_USER_DATA,
  payload: userData,
})
