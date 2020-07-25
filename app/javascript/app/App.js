import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import { userActions } from './actions'
import NavigationHeader from '../components/NavigationHeader'
import Map from '../components/Map'
import PlacesLivedModal from '../components/PlacesLivedModal'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import styles from './App.module.scss'

const store = configureStore()

const App = ({ user, isLoggedIn }) => {
  useEffect(() => {
    store.dispatch(userActions.setUserData(user))
  }, [user])

  return (
    <Provider store={store}>
      <div className={styles.travelGlobeWrapper}>
        <NavigationHeader user={user} isLoggedIn={isLoggedIn} />
        <Map />
        <PlacesLivedModal isLoggedIn={isLoggedIn} />
      </div>
    </Provider>
  )
}

export default App
