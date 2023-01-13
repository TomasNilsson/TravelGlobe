import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { placesLivedActions } from '../actions'
import { userSelectors } from '../selectors'

const createPlaceLivedEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(placesLivedActions.TYPES.ADD_PLACE_LIVED),
    mergeMap(({ payload: place }) =>
      ajax({
        url: '/places_lived',
        method: 'POST',
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
          placesLivedActions.addPlaceLivedSuccess(responseData.response)
        )
      )
    )
  )

export default createPlaceLivedEpic
