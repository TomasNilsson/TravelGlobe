export const TYPES = {
  ADD_PLACE_LIVED: 'placesLived/ADD_PLACE_LIVED',
  ADD_PLACE_LIVED_SUCCESS: 'placesLived/ADD_PLACE_LIVED_SUCCESS',
  FETCH_PLACES_LIVED: 'placesLived/FETCH_PLACES_LIVED',
  FETCH_PLACES_LIVED_SUCCESS: 'placesLived/FETCH_PLACES_LIVED_SUCCESS',
  SET_SELECTED_PLACE_ID: 'placesLived/SET_SELECTED_PLACE_ID',
  SHOW_PLACES_LIVED_FORM: 'placesLived/SHOW_PLACES_LIVED_FORM',
  TOGGLE_PLACES_LIVED_MODAL: 'placesLived/TOGGLE_PLACES_LIVED_MODAL',
  TOGGLE_PLACES_LIVED_FORM_MODAL: 'placesLived/TOGGLE_PLACES_LIVED_FORM_MODAL',
  UPDATE_PLACE_LIVED: 'placesLived/UPDATE_PLACE_LIVED',
  UPDATE_PLACE_LIVED_SUCCESS: 'placesLived/UPDATE_PLACE_LIVED_SUCCESS',
}

export const addPlaceLived = (place) => ({
  type: TYPES.ADD_PLACE_LIVED,
  payload: place,
})

export const addPlaceLivedSuccess = (place) => ({
  type: TYPES.ADD_PLACE_LIVED_SUCCESS,
  payload: place,
})

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

export const showPlaceLivedForm = (placeId) => ({
  type: TYPES.SHOW_PLACES_LIVED_FORM,
  payload: placeId,
})

export const togglePlacesLivedModal = () => ({
  type: TYPES.TOGGLE_PLACES_LIVED_MODAL,
})

export const togglePlaceLivedFormModal = () => ({
  type: TYPES.TOGGLE_PLACES_LIVED_FORM_MODAL,
})

export const updatePlaceLived = (place) => ({
  type: TYPES.UPDATE_PLACE_LIVED,
  payload: place,
})

export const updatePlaceLivedSuccess = (place) => ({
  type: TYPES.UPDATE_PLACE_LIVED_SUCCESS,
  payload: place,
})
