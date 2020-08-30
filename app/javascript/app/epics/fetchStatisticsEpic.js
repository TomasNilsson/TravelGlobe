import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { userSelectors } from '../selectors'
import { statisticsActions, userActions } from '../actions'

const fetchStatisticsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(
      userActions.TYPES.SET_USER_DATA,
      statisticsActions.TYPES.FETCH_STATISTICS
    ),
    mergeMap(() =>
      ajax
        .getJSON(`/users/${userSelectors.getUserId(state$.value)}/statistics`)
        .pipe(
          map((response) => statisticsActions.fetchStatisticsSuccess(response))
        )
    )
  )

export default fetchStatisticsEpic
