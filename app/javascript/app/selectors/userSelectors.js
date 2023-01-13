const getUserState = (state) => state.user

export const getUserInfo = (state) => getUserState(state).userInfo

export const getUserId = (state) => getUserInfo(state).id

export const getToken = (state) => getUserState(state).token

export const getIsLoggedIn = (state) => !!getToken(state)

export const getIsLoginModalOpen = (state) =>
  getUserState(state).isLoginModalOpen
