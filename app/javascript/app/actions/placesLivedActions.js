export const TYPES = {
  FETCH_PLACES_LIVED: 'placesLived/FETCH_PLACES_LIVED',
  FETCH_PLACES_LIVED_SUCCESS: 'placesLived/FETCH_PLACES_LIVED_SUCCESS',
}

export const fetchPlacesLived = () => ({
  type: TYPES.FETCH_PLACES_LIVED,
})

export const fetchPlacesLivedSuccess = (placesLived) => ({
  type: TYPES.FETCH_PLACES_LIVED_SUCCESS,
  payload: placesLived,
})
