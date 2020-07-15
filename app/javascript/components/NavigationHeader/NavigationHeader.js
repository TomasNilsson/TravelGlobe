import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import {
  FaPlaneDeparture,
  FaGlobeEurope,
  FaHome,
  FaChartBar,
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

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">TravelGlobe</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {navLinks.map(({ text, href, icon: LinkIcon }) => (
            <Nav.Link key={text} href={href} className="px-lg-3">
              <LinkIcon /> {text}
            </Nav.Link>
          ))}
        </Nav>
        <Nav>
          {user && (
            <Nav.Link href="#">
              <img src={user.image_url} /> {user.name}
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationHeader
