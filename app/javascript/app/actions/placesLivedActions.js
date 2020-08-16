export const TYPES = {
  FETCH_PLACES_LIVED: 'placesLived/FETCH_PLACES_LIVED',
  FETCH_PLACES_LIVED_SUCCESS: 'placesLived/FETCH_PLACES_LIVED_SUCCESS',
  SET_SELECTED_PLACE_ID: 'placesLived/SET_SELECTED_PLACE_ID',
  TOGGLE_PLACES_LIVED_MODAL: 'placesLived/TOGGLE_PLACES_LIVED_MODAL',
}

export const fetchPlacesLived = () => ({
  type: TYPES.FETCH_PLACES_LIVED,
})

export const fetchPlacesLivedSuccess = (placesLived) => ({
  type: TYPES.FETCH_PLACES_LIVED_SUCCESS,
  payload: placesLived,
})

export const setSelectedPlaceId = (placeId) => ({
  type: TYPES.SET_SELECTED_PLACE_ID,
  payload: placeId,
})

export const togglePlacesLivedModal = () => ({
  type: TYPES.TOGGLE_PLACES_LIVED_MODAL,
})
