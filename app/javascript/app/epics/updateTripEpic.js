import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { myTripsActions } from '../actions'

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
