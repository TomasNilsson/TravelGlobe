import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
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
import { useDispatch } from 'react-redux'
import { myTripsActions, placesLivedActions } from '../../app/actions'

const NavigationHeader = ({ user, isLoggedIn }) => {
  const dispatch = useDispatch()

  const navLinks = [
    ...(isLoggedIn
      ? [
          {
            text: 'Add New Trip',
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
    { text: 'Statistics', icon: FaChartBar },
  ]

  const dropdownLinks = isLoggedIn
    ? [
        { text: 'Share', href: '#', icon: FaShare },
        { text: 'Export to Excel', href: '#', icon: FaFileExport },
        { text: 'Log out', href: '#', icon: FaPowerOff },
      ]
    : [{ text: 'Create your own TravelGlobe', href: '/', icon: FaUserPlus }]

  return (
    <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">TravelGlobe</Navbar.Brand>
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
        {user && (
          <Nav as="ul">
            <Nav.Item as="li">
              <NavDropdown
                title={
                  <span>
                    <img src={user.image_url} /> {user.name}
                  </span>
                }
                id="nav-dropdown"
                alignRight
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
