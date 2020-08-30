import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { userSelectors } from '../selectors'
import { myTripsActions, userActions } from '../actions'

const fetchMyTripsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(
      userActions.TYPES.SET_USER_DATA,
      myTripsActions.TYPES.FETCH_MY_TRIPS
    ),
    mergeMap(() =>
      ajax
        .getJSON(`/users/${userSelectors.getUserId(state$.value)}/trips`)
        .pipe(map((response) => myTripsActions.fetchMyTripsSuccess(response)))
    )
  )

export default fetchMyTripsEpic
