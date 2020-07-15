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

const NavigationHeader = ({ user, isLoggedIn }) => {
  const navLinks = [
    ...(isLoggedIn
      ? [{ text: 'Add New Trip', href: '#', icon: FaPlaneDeparture }]
      : []),
    { text: 'My Trips', href: '#', icon: FaGlobeEurope },
    { text: 'Places Lived', href: '#', icon: FaHome },
    { text: 'Statistics', href: '#', icon: FaChartBar },
  ]

  const dropdownLinks = isLoggedIn
    ? [
        { text: 'Share', href: '#', icon: FaShare },
        { text: 'Export to Excel', href: '#', icon: FaFileExport },
        { text: 'Log out', href: '#', icon: FaPowerOff },
      ]
    : [{ text: 'Create your own TravelGlobe', href: '/', icon: FaUserPlus }]

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">TravelGlobe</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto" as="ul">
          {navLinks.map(({ text, href, icon: LinkIcon }) => (
            <Nav.Item key={text} as="li">
              <Nav.Link href={href} className="px-lg-3">
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
