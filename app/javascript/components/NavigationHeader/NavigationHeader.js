import React from 'react'
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap'
import {
  FaPlaneDeparture,
  FaGlobeEurope,
  FaHome,
  FaChartBar,
  FaShare,
  FaFileExport,
  FaPowerOff,
  FaUserPlus,
} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import styles from './NavigationHeader.module.scss'
import {
  myTripsActions,
  placesLivedActions,
  statisticsActions,
} from '../../app/actions'
import { userSelectors } from '../../app/selectors'

const NavigationHeader = () => {
  const dispatch = useDispatch()

  const userName = useSelector(userSelectors.getUserName)
  const userImageUrl = useSelector(userSelectors.getUserImageUrl)
  const isLoggedIn = useSelector(userSelectors.getIsLoggedIn)

  const navLinks = [
    ...(isLoggedIn
      ? [
          {
            text: 'Add New Trip',
            action: myTripsActions.showTripForm(),
            icon: FaPlaneDeparture,
          },
        ]
      : []),
    {
      text: 'My Trips',
      action: myTripsActions.toggleMyTripsModal(),
      icon: FaGlobeEurope,
    },
    {
      text: 'Places Lived',
      action: placesLivedActions.togglePlacesLivedModal(),
      icon: FaHome,
    },
    {
      text: 'Statistics',
      action: statisticsActions.toggleStatisticsModal(),
      icon: FaChartBar,
    },
  ]

  const dropdownLinks = isLoggedIn
    ? [
        { text: 'Share', href: '#', icon: FaShare },
        { text: 'Export to Excel', href: '#', icon: FaFileExport },
        { text: 'Log out', href: '#', icon: FaPowerOff },
      ]
    : [{ text: 'Create your own TravelGlobe', href: '/', icon: FaUserPlus }]

  return (
    <Navbar fixed="top" bg="dark" variant="dark" expand="lg" className="py-0">
      <Navbar.Brand href="/" className={styles.travelGlobeLogo}>
        TravelGlobe
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto" as="ul">
          {navLinks.map(({ text, action, icon: LinkIcon }) => (
            <Nav.Item key={text} as="li">
              <Nav.Link
                eventKey={text}
                onSelect={() => dispatch(action)}
                className="px-lg-3"
              >
                <LinkIcon /> {text}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        {userName && (
          <Nav as="ul">
            <Nav.Item as="li">
              <NavDropdown
                title={
                  <>
                    <Image
                      src={userImageUrl}
                      roundedCircle
                      alt="User"
                      height="40"
                    />{' '}
                    {userName}
                  </>
                }
                id="nav-dropdown"
                alignRight
                className="pb-2 pb-lg-0"
              >
                {dropdownLinks.map(({ text, href, icon: LinkIcon }) => (
                  <NavDropdown.Item key={text} href={href}>
                    <LinkIcon /> {text}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav.Item>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationHeader
