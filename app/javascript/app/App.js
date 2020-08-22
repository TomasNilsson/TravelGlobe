import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import { enGB } from 'date-fns/locale'
import configureStore from './configureStore'
import { userActions } from './actions'
import NavigationHeader from '../components/NavigationHeader'
import Map from '../components/Map'
import LoginModal from '../components/LoginModal'
import MyTripsModal from '../components/MyTripsModal'
import PlacesLivedModal from '../components/PlacesLivedModal'
import StatisticsModal from '../components/StatisticsModal'
import TripInfoSidebar from '../components/TripInfoSidebar'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './App.module.scss'
import TripFormModal from '../components/TripFormModal'

const store = configureStore()

registerLocale('en-GB', enGB)
setDefaultLocale('en-GB')

const App = ({ user, isLoggedIn }) => {
  useEffect(() => {
    if (user) {
      store.dispatch(userActions.setUserData(user))
    }
  }, [user])

  return (
    <Provider store={store}>
      <div className={styles.travelGlobeWrapper}>
        <NavigationHeader user={user} isLoggedIn={isLoggedIn} />
        <Map />
        {user ? (
          <>
            {isLoggedIn && <TripFormModal />}
            <MyTripsModal isLoggedIn={isLoggedIn} />
            <PlacesLivedModal isLoggedIn={isLoggedIn} />
            <StatisticsModal />
            <TripInfoSidebar />
          </>
        ) : (
          <LoginModal />
        )}
      </div>
    </Provider>
  )
}

export default App
