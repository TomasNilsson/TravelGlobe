export const TYPES = {
  FETCH_PLACES_LIVED: 'placesLived/FETCH_PLACES_LIVED',
  FETCH_PLACES_LIVED_SUCCESS: 'placesLived/FETCH_PLACES_LIVED_SUCCESS',
  TOGGLE_PLACES_LIVED_MODAL: 'placesLived/TOGGLE_PLACES_LIVED_MODAL',
}

export const fetchPlacesLived = () => ({
  type: TYPES.FETCH_PLACES_LIVED,
})

export const fetchPlacesLivedSuccess = (placesLived) => ({
  type: TYPES.FETCH_PLACES_LIVED_SUCCESS,
  payload: placesLived,
})

export const togglePlacesLivedModal = () => ({
  type: TYPES.TOGGLE_PLACES_LIVED_MODAL,
})
