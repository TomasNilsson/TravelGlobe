import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { placesLivedActions } from '../actions'

const updatePlaceLivedEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(placesLivedActions.TYPES.UPDATE_PLACE_LIVED),
    mergeMap(({ payload: place }) =>
      ajax({
        url: `/places_lived/${place.id}`,
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: {
          place_lived: place,
        },
      }).pipe(
        map((responseData) =>
          placesLivedActions.updatePlaceLivedSuccess(responseData.response)
        )
      )
    )
  )

export default updatePlaceLivedEpic
