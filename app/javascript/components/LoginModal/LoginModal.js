import React from 'react'
import { Container, Modal, Jumbotron } from 'react-bootstrap'
import travelGlobeImage from './travelglobe.png'
import facebookLogo from './facebook.png'

const LoginModal = () => (
  <Modal show centered size="lg" backdrop="static">
    <Modal.Body>
      <Jumbotron fluid className="mb-0">
        <img src={travelGlobeImage} className="img-fluid" />
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
          <a href="/auth/facebook">
            <img src={facebookLogo} />
          </a>
        </Container>
      </Jumbotron>
    </Modal.Body>
  </Modal>
)

export default LoginModal
