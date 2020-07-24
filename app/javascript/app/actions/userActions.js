export const TYPES = {
  SET_USER_DATA: 'user/SET_USER_DATA',
}

export const setUserData = (userData) => ({
  type: TYPES.SET_USER_DATA,
  payload: userData,
})
