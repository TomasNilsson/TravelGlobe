import React from 'react'
import NavigationHeader from './NavigationHeader'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = ({ user, isLoggedIn }) => (
  <>
    <NavigationHeader user={user} isLoggedIn={isLoggedIn} />
  </>
)

export default App
