import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Modal,
  Card,
  Badge,
  Container,
  Row,
  Col,
  Image,
  Button,
} from 'react-bootstrap'
import { mapActions, myTripsActions } from '../../app/actions'
import { myTripsSelectors } from '../../app/selectors'
import styles from './TripInfoSidebar.module.scss'

const TripInfoSidebar = () => {
  const dispatch = useDispatch()
  const handleClose = () => dispatch(myTripsActions.toggleTripInfoSidebar())
  const removeMarkers = () => dispatch(mapActions.removeMarkers())

  const isOpen = useSelector(myTripsSelectors.getIsTripInfoSidebarOpen)
  const {
    categories = [],
    countries = [],
    startDate,
    endDate,
    name,
    places = [],
    travelPartners = [],
    photos = [],
  } = useSelector(myTripsSelectors.getTripInfoForSelectedId) || {}

  useEffect(() => {
    if (places.length > 0) {
      const markers = places.map(({ latitude, longitude, name }) => ({
        lat: latitude,
        lng: longitude,
        text: name,
      }))
      dispatch(mapActions.setMarkers(markers))
    }
  }, [places])

  const tripDetails = [
    { label: 'Date', value: `${startDate} - ${endDate}` },
    ...(travelPartners.length > 0
      ? [{ label: 'Travel Partners', value: travelPartners.join(', ') }]
      : []),
    {
      label: 'Countries',
      value: countries.map((country) => country.name).join(', '),
    },
    { label: 'Places', value: places.map((place) => place.name).join(', ') },
  ]

  return (
    <Modal
      centered
      scrollable
      backdrop={false}
      dialogClassName={styles.modalLeftSidebar}
      show={isOpen}
      onHide={handleClose}
      onExit={removeMarkers}
      bsPrefix={`modal ${styles.modalWrapper}`}
    >
      <Modal.Header closeButton>
        <Modal.Title>Trip Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {name && (
          <>
            <h5>{name}</h5>
            {categories.map((category) => (
              <Badge variant="primary" key={category}>
                {category}
              </Badge>
            ))}
            <dl className="row mt-3">
              {tripDetails.map(({ label, value }) => (
                <React.Fragment key={label}>
                  <dt className="col-lg-3">{label}</dt>
                  <dd className="col-lg-9">{value}</dd>
                </React.Fragment>
              ))}
            </dl>
            <Row>
              {photos.map(({ thumbUrl }) => (
                <Col xs={6} className="pb-2 px-0" key={thumbUrl}>
                  <Image src={thumbUrl} thumbnail />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TripInfoSidebar
