import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { myTripsActions } from '../actions'
import { userSelectors } from '../selectors'

const createTripEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(myTripsActions.TYPES.ADD_TRIP),
    mergeMap(({ payload: trip }) =>
      ajax({
        url: '/trips',
        method: 'POST',
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
          myTripsActions.addTripSuccess(responseData.response)
        )
      )
    )
  )

export default createTripEpic
