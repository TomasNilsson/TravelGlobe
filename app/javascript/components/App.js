import React from 'react'
import NavigationHeader from './NavigationHeader'
import Map from './Map'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './App.module.scss'

const App = ({ user, isLoggedIn }) => (
  <div className={styles.travelGlobeWrapper}>
    <NavigationHeader user={user} isLoggedIn={isLoggedIn} />
    <Map />
  </div>
)

export default App
