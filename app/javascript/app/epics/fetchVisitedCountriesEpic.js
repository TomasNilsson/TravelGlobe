import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { userSelectors } from '../selectors'
import { mapActions, userActions } from '../actions'

const fetchVisitedCountriesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(
      userActions.TYPES.SET_USER_DATA,
      mapActions.TYPES.FETCH_VISITED_COUNTRIES
    ),
    mergeMap(() =>
      ajax
        .getJSON(
          `/users/${userSelectors.getUserId(state$.value)}/visited_countries`
        )
        .pipe(
          map((response) => mapActions.fetchVisitedCountriesSuccess(response))
        )
    )
  )

export default fetchVisitedCountriesEpic
