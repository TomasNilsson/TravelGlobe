import { ofType } from 'redux-observable'
import { of } from 'rxjs'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { userActions } from '../actions'

const refreshTokenEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(userActions.TYPES.REFRESH_TOKEN),
    mergeMap(({ payload: token }) =>
      ajax({
        url: '/auth/refresh',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: {
          jwt: token,
        },
      }).pipe(
        map((responseData) => userActions.setUserData(responseData.response)),
        catchError(() => of(userActions.showLoginModal()))
      )
    )
  )

export default refreshTokenEpic
