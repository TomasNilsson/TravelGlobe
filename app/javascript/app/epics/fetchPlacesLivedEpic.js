import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { userSelectors } from '../selectors'
import { placesLivedActions, userActions } from '../actions'

const fetchPlacesLivedEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(
      userActions.TYPES.SET_USER_DATA,
      placesLivedActions.TYPES.FETCH_PLACES_LIVED
    ),
    mergeMap(() =>
      ajax
        .getJSON(`/users/${userSelectors.getUserId(state$.value)}/places_lived`)
        .pipe(
          map((response) =>
            placesLivedActions.fetchPlacesLivedSuccess(response)
          )
        )
    )
  )

export default fetchPlacesLivedEpic
