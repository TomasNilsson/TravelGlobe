const getPlacesLivedState = (state) => state.placesLived

export const getPlacesLived = (state) => getPlacesLivedState(state).places

export const getIsPlacesLivedModalOpen = (state) =>
  getPlacesLivedState(state).isModalOpen
