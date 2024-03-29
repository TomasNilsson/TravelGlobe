import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { myTripsActions } from '../actions'
import { userSelectors } from '../selectors'

const updateTripEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(myTripsActions.TYPES.UPDATE_TRIP),
    mergeMap(({ payload: trip }) =>
      ajax({
        url: `/trips/${trip.id}`,
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userSelectors.getToken(state$.value)}`,
        },
        body: {
          trip,
        },
      }).pipe(
        map((responseData) =>
          myTripsActions.updateTripSuccess(responseData.response)
        )
      )
    )
  )

export default updateTripEpic
