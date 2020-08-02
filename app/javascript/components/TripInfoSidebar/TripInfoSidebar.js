import React from 'react'
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
import { myTripsActions } from '../../app/actions'
import { myTripsSelectors } from '../../app/selectors'
import styles from './TripInfoSidebar.module.scss'

const TripInfoSidebar = () => {
  const dispatch = useDispatch()
  const handleClose = () => dispatch(myTripsActions.toggleTripInfoSidebar())

  const isOpen = useSelector(myTripsSelectors.getIsTripInfoSidebarOpen)
  const {
    categories = [],
    countries = [],
    date,
    name,
    places = [],
    travelPartners = [],
    photos = [],
  } = useSelector(myTripsSelectors.getTripInfoForSelectedId)

  const tripDetails = [
    { label: 'Date', value: date },
    ...(travelPartners.length > 0
      ? [{ label: 'Travel Partners', value: travelPartners.join(', ') }]
      : []),
    { label: 'Countries', value: countries.join(', ') },
    { label: 'Places', value: places.join(', ') },
  ]

  return (
    <Modal
      centered
      scrollable
      dialogClassName={styles.modalLeftSidebar}
      className={styles.modalContent}
      show={isOpen}
      onHide={handleClose}
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
