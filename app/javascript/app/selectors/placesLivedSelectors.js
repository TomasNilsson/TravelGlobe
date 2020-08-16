const getPlacesLivedState = (state) => state.placesLived

export const getPlacesLived = (state) => getPlacesLivedState(state).places

export const getPlaceInfoById = (state, placeId) =>
  getPlacesLived(state).find((place) => place.id === placeId)

export const getSelectedPlaceId = (state) =>
  getPlacesLivedState(state).selectedPlaceId

export const getPlaceInfoForSelectedId = (state) =>
  getPlaceInfoById(state, getSelectedPlaceId(state))

export const getIsPlacesLivedModalOpen = (state) =>
  getPlacesLivedState(state).isModalOpen
