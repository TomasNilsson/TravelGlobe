import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { placesLivedActions } from '../actions'

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
