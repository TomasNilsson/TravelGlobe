import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'
import DataTable from '../DataTable'
import { myTripsActions } from '../../app/actions'
import { myTripsSelectors, userSelectors } from '../../app/selectors'

const MyTripsModal = () => {
  const dispatch = useDispatch()
  const handleClose = () => dispatch(myTripsActions.toggleMyTripsModal())
  const showTripInfo = (tripId) => dispatch(myTripsActions.showTripInfo(tripId))
  const showTripForm = (tripId) => dispatch(myTripsActions.showTripForm(tripId))

  const isOpen = useSelector(myTripsSelectors.getIsMyTripsModalOpen)
  const trips = useSelector(myTripsSelectors.getMyTrips)
  const searchString = useSelector(myTripsSelectors.getMyTripsSearch)
  const isLoggedIn = useSelector(userSelectors.getIsLoggedIn)

  const dateFormatter = ({ startDate, endDate }) => `${startDate} - ${endDate}`
  const arrayToCommaSeparatedString = (array = []) =>
    array.map((element) => element.name).join(', ')

  const columns = [
    {
      dataField: 'id',
      hidden: true,
      searchable: false,
    },
    {
      dataField: 'date',
      isDummyField: true,
      text: 'Date',
      sort: true,
      formatter: (cell, row) => dateFormatter(row),
      sortValue: (cell, row) => dateFormatter(row),
      filterValue: (cell, row) => dateFormatter(row),
    },
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
      formatter: (cell, row) => (
        <Button
          variant="link"
          className="p-0"
          onClick={() => showTripInfo(row.id)}
        >
          {cell}
        </Button>
      ),
    },
    {
      dataField: 'countries',
      text: 'Countries/States',
      sort: true,
      formatter: arrayToCommaSeparatedString,
      sortValue: arrayToCommaSeparatedString,
      filterValue: arrayToCommaSeparatedString,
    },
    {
      dataField: 'categories',
      text: 'Categories',
      sort: true,
      formatter: arrayToCommaSeparatedString,
      sortValue: arrayToCommaSeparatedString,
      filterValue: arrayToCommaSeparatedString,
    },
    {
      dataField: 'travelPartners',
      hidden: true,
      formatter: arrayToCommaSeparatedString,
      sortValue: arrayToCommaSeparatedString,
      filterValue: arrayToCommaSeparatedString,
    },
    {
      dataField: 'actions',
      isDummyField: true,
      text: 'Actions',
      searchable: false,
      formatter: (cell, row) => (
        <Button
          variant="link"
          className="p-0"
          onClick={() => showTripForm(row.id)}
        >
          <FaEdit />
        </Button>
      ),
    },
  ]

  const defaultSorted = [
    {
      dataField: 'date',
      order: 'desc',
    },
  ]

  return (
    <Modal centered size="xl" show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>My Trips</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DataTable
          keyField="id"
          data={trips}
          columns={columns}
          defaultSorted={defaultSorted}
          defaultSearch={searchString}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Close
        </Button>
        {isLoggedIn && (
          <Button variant="primary" onClick={() => showTripForm()}>
            Add New Trip
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default MyTripsModal
