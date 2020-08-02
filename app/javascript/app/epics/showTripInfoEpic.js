import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { myTripsActions } from '../actions'

const showTripInfoEpic = (action$, state$, { getJSON }) =>
  action$.pipe(
    ofType(myTripsActions.TYPES.SHOW_TRIP_INFO),
    mergeMap(({ payload: tripId }) =>
      getJSON(`/trips/${tripId}/info`).pipe(
        map((response) => myTripsActions.fetchTripInfoSuccess(response))
      )
    )
  )

export default showTripInfoEpic
