import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Container, Modal, Jumbotron } from 'react-bootstrap'
import { GoogleLogin } from '@react-oauth/google'
import { userActions } from '../../app/actions'
import { userSelectors } from '../../app/selectors'
import travelGlobeImage from './travelglobe.png'

const LoginModal = () => {
  const dispatch = useDispatch()

  const userSelected = !!useSelector(userSelectors.getUserId)

  const handleCredentialResponse = (credentialResponse) =>
    dispatch(userActions.login(credentialResponse.credential))

  return !userSelected ? (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
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
                <span className="text-primary font-weight-bold">
                  travelling
                </span>
                , including{' '}
                <span className="text-primary font-weight-bold">
                  photos and info for each trip
                </span>
                .
              </p>
              <GoogleLogin
                locale="en_GB"
                onSuccess={handleCredentialResponse}
                onError={() => {
                  console.log('Login Failed')
                }}
              />
            </Container>
          </Jumbotron>
        </Modal.Body>
      </Modal>
    </GoogleOAuthProvider>
  ) : null
}

export default LoginModal
