import { ofType } from 'redux-observable'
import { filter, mergeMap, map } from 'rxjs/operators'
import { myTripsActions } from '../actions'

const fetchTripInfoEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(
      myTripsActions.TYPES.SHOW_TRIP_INFO,
      myTripsActions.TYPES.SHOW_TRIP_FORM
    ),
    filter(({ payload }) => !!payload),
    mergeMap(({ payload: tripId }) =>
      ajax.getJSON(`/trips/${tripId}/info`).pipe(
        map((response) =>
          myTripsActions.fetchTripInfoSuccess({
            ...response,
            extraInfoLoaded: true,
          })
        )
      )
    )
  )

export default fetchTripInfoEpic
