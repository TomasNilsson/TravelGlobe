import React from 'react'
import { Container, Button, Modal, Jumbotron } from 'react-bootstrap'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import travelGlobeImage from './travelglobe.png'
import facebookLogo from './facebook.png'

const LoginModal = () => {
  const handleLoginCallback = (loginResponse) => {
    if (loginResponse.accessToken) {
      window.location.href = '/auth/facebook/callback' // Will pass the cookie set during login to the server
    }
  }

  return (
    <Modal show centered size="lg" backdrop="static">
      <Modal.Body>
        <Jumbotron fluid className="mb-0">
          <img
            src={travelGlobeImage}
            className="img-fluid"
            alt="TravelGlobe map"
          />
          <Container className="text-center mt-3">
            <h1>Welcome to TravelGlobe!</h1>
            <p className="lead">
              Create a{' '}
              <span className="text-primary font-weight-bold">
                map-based overview
              </span>{' '}
              of where in the world you have been{' '}
              <span className="text-primary font-weight-bold">travelling</span>,
              including{' '}
              <span className="text-primary font-weight-bold">
                photos and info for each trip
              </span>
              .
            </p>
            <FacebookLogin
              version="11.0"
              appId={process.env.FACEBOOK_APP_ID}
              fields="name,email,picture"
              cookie={true}
              callback={handleLoginCallback}
              render={({ onClick }) => (
                <Button variant="link" onClick={onClick}>
                  <img src={facebookLogo} alt="Log in with Facebook" />
                </Button>
              )}
            />
          </Container>
        </Jumbotron>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
