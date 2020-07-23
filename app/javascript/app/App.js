import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import NavigationHeader from '../components/NavigationHeader'
import Map from '../components/Map'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './App.module.scss'

const store = configureStore()

const App = ({ user, isLoggedIn }) => (
  <Provider store={store}>
    <div className={styles.travelGlobeWrapper}>
      <NavigationHeader user={user} isLoggedIn={isLoggedIn} />
      <Map />
    </div>
  </Provider>
)

export default App
