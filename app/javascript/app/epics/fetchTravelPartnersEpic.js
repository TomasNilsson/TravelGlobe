import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { userSelectors } from '../selectors'
import { myTripsActions } from '../actions'

const fetchTravelPartnersEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(myTripsActions.TYPES.FETCH_TRAVEL_PARTNERS),
    mergeMap(() =>
      ajax
        .getJSON(
          `/users/${userSelectors.getUserId(state$.value)}/travel-partners`
        )
        .pipe(
          map((response) => myTripsActions.fetchTravelPartnersSuccess(response))
        )
    )
  )

export default fetchTravelPartnersEpic
