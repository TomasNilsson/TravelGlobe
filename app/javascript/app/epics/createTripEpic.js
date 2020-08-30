import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { userSelectors } from '../selectors'
import { myTripsActions } from '../actions'

const createTripEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(myTripsActions.TYPES.ADD_TRIP),
    mergeMap(({ payload: trip }) =>
      ajax({
        url: '/trips',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          trip,
        },
      }).pipe(
        map((responseData) =>
          myTripsActions.addTripSuccess(responseData.response)
        )
      )
    )
  )

export default createTripEpic
