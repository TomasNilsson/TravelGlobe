const getUserState = (state) => state.user

export const getUserId = (state) => getUserState(state).id

export const getUserName = (state) => getUserState(state).name

export const getUserImageUrl = (state) => getUserState(state).imageUrl

export const getToken = (state) => getUserState(state).token

export const getIsLoggedIn = (state) => !!getToken(state)
