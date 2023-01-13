import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Container, Modal, Jumbotron } from 'react-bootstrap'
import { GoogleLogin } from '@react-oauth/google'
import { userActions } from '../../app/actions'
import { userSelectors } from '../../app/selectors'
import travelGlobeImage from './travelglobe.png'

const LoginModal = () => {
  const dispatch = useDispatch()

  const isOpen = useSelector(userSelectors.getIsLoginModalOpen)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(userActions.refreshToken(token))
    } else {
      dispatch(userActions.showLoginModal())
    }
  }, [])

  const handleCredentialResponse = (credentialResponse) =>
    dispatch(userActions.login(credentialResponse.credential))

  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
      <Modal show={isOpen} centered size="lg" backdrop="static">
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
              <div className="d-flex justify-content-center pt-2">
                <GoogleLogin
                  locale="en_GB"
                  onSuccess={handleCredentialResponse}
                  onError={() => {
                    console.log('Login Failed')
                  }}
                />
              </div>
            </Container>
          </Jumbotron>
        </Modal.Body>
      </Modal>
    </GoogleOAuthProvider>
  )
}

export default LoginModal
