import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Card, Badge, ListGroup, Button } from 'react-bootstrap'
import { statisticsActions, myTripsActions } from '../../app/actions'
import { statisticsSelectors } from '../../app/selectors'

const StatisticsModal = () => {
  const dispatch = useDispatch()
  const handleClose = () => dispatch(statisticsActions.toggleStatisticsModal())
  const showTripsMatchingSearch = (search) => {
    dispatch(myTripsActions.toggleMyTripsModal(search))
    dispatch(statisticsActions.toggleStatisticsModal())
  }

  const isOpen = useSelector(statisticsSelectors.getIsStatisticsModalOpen)
  const numberOfTrips = useSelector(statisticsSelectors.getNumberOfTrips)
  const numberOfVisitedCountries = useSelector(
    statisticsSelectors.getNumberOfVisitedCountries
  )
  const numberOfDaysTravelling = useSelector(
    statisticsSelectors.getNumberOfDaysTravelling
  )
  const numberOfPlacesLived = useSelector(
    statisticsSelectors.getNumberOfPlacesLived
  )
  const travelPartnersTopList = useSelector(
    statisticsSelectors.getTravelPartnersTopList
  )

  const statistics = [
    { label: 'Number of Trips', value: numberOfTrips },
    { label: 'Number of Visited Countries', value: numberOfVisitedCountries },
    { label: 'Number of Days Travelling', value: numberOfDaysTravelling },
    { label: "Number of Places I've Lived", value: numberOfPlacesLived },
  ]

  return (
    <Modal centered size="lg" show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Statistics</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <ListGroup variant="flush">
            {statistics.map(({ label, value }) => (
              <ListGroup.Item as="h5" className="mb-0" key={label}>
                {label}:
                <Badge variant="primary" className="ml-2">
                  {value}
                </Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
        <Card bg="light" className="mt-4">
          <Card.Header as="h5">Top 10 Travel Partners:</Card.Header>
          <ListGroup as="ol" variant="flush">
            {travelPartnersTopList.map(({ name, tripCount }, i) => (
              <ListGroup.Item as="li" className="py-1" key={name}>
                <Badge pill variant="dark" className="mr-2">
                  {i + 1}
                </Badge>
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => showTripsMatchingSearch(name)}
                >
                  {name}, {tripCount} {tripCount === 1 ? 'trip' : 'trips'}
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default StatisticsModal
