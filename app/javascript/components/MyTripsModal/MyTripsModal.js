import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import DataTable from '../DataTable'
import { myTripsActions } from '../../app/actions'
import { myTripsSelectors } from '../../app/selectors'

const MyTripsModal = ({ isLoggedIn }) => {
  const dispatch = useDispatch()
  const handleClose = () => dispatch(myTripsActions.toggleMyTripsModal())

  const isOpen = useSelector(myTripsSelectors.getIsMyTripsModalOpen)
  const trips = useSelector(myTripsSelectors.getMyTrips)

  const columns = [
    {
      dataField: 'id',
      hidden: true,
    },
    {
      dataField: 'date',
      text: 'Date',
      sort: true,
    },
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
    },
    {
      dataField: 'countries',
      text: 'Countries/States',
      sort: true,
      formatter: (cell) => cell.join(', '),
      sortValue: (cell) => cell.join(', '),
    },
    {
      dataField: 'categories',
      text: 'Categories',
      sort: true,
      formatter: (cell) => cell.join(', '),
      sortValue: (cell) => cell.join(', '),
    },
    {
      dataField: 'travel_partners',
      hidden: true,
      formatter: (cell) => cell.join(', '),
      sortValue: (cell) => cell.join(', '),
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
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {isLoggedIn && (
          <Button variant="primary" onClick={() => null}>
            Add New Trip
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default MyTripsModal
