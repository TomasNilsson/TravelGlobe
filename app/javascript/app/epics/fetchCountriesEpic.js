import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { mapActions } from '../actions'

const fetchCountriesEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(mapActions.TYPES.FETCH_COUNTRIES),
    mergeMap(() =>
      ajax
        .getJSON(`/countries`)
        .pipe(map((response) => mapActions.fetchCountriesSuccess(response)))
    )
  )

export default fetchCountriesEpic
