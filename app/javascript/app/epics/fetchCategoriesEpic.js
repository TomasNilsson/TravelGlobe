import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { userSelectors } from '../selectors'
import { myTripsActions } from '../actions'

const fetchCategoriesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(myTripsActions.TYPES.FETCH_CATEGORIES),
    mergeMap(() =>
      ajax
        .getJSON(`/users/${userSelectors.getUserId(state$.value)}/categories`)
        .pipe(
          map((response) => myTripsActions.fetchCategoriesSuccess(response))
        )
    )
  )

export default fetchCategoriesEpic
