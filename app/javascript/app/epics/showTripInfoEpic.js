import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { myTripsActions } from '../actions'

const showTripInfoEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(myTripsActions.TYPES.SHOW_TRIP_INFO),
    mergeMap(({ payload: tripId }) =>
      ajax
        .getJSON(`/trips/${tripId}/info`)
        .pipe(map((response) => myTripsActions.fetchTripInfoSuccess(response)))
    )
  )

export default showTripInfoEpic
