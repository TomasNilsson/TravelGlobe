import { ofType } from 'redux-observable'
import { mergeMap, map, tap } from 'rxjs/operators'
import { userActions } from '../actions'

const loginEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(userActions.TYPES.LOGIN),
    mergeMap(({ payload: googleJwt }) =>
      ajax({
        url: '/auth/login',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: {
          jwt: googleJwt,
        },
      }).pipe(
        tap((responseData) => {
          localStorage.setItem('token', responseData.response.token)
        }),
        map((responseData) => userActions.setUserData(responseData.response))
      )
    )
  )

export default loginEpic
