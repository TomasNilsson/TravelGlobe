import { ofType } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { userActions } from '../actions'

const loginEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(userActions.TYPES.LOGIN),
    mergeMap(({ payload: googleJwt }) =>
      ajax({
        url: '/login',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: {
          jwt: googleJwt,
        },
      }).pipe(
        map((responseData) => userActions.setUserData(responseData.response))
      )
    )
  )

export default loginEpic
