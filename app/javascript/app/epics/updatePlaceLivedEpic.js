import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { placesLivedActions } from '../actions'
import { userSelectors } from '../selectors'

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
          Authorization: `Bearer ${userSelectors.getToken(state$.value)}`,
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
