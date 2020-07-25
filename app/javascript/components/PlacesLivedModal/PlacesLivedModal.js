import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import { placesLivedActions } from '../../app/actions'
import { placesLivedSelectors } from '../../app/selectors'

const PlacesLivedModal = ({ isLoggedIn }) => {
  const dispatch = useDispatch()
  const handleClose = () =>
    dispatch(placesLivedActions.togglePlacesLivedModal())

  const isOpen = useSelector(placesLivedSelectors.getIsPlacesLivedModalOpen)
  const placesLived = useSelector(placesLivedSelectors.getPlacesLived)

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
      dataField: 'address',
      text: 'Address',
      sort: true,
    },
    {
      dataField: 'country',
      text: 'Country/State',
      sort: true,
    },
  ]

  const defaultSorted = [
    {
      dataField: 'date',
      order: 'asc',
    },
  ]

  return (
    <Modal centered size="lg" show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Places I've Lived</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BootstrapTable
          keyField="id"
          data={placesLived}
          columns={columns}
          defaultSorted={defaultSorted}
          bordered={false}
          bootstrap4
          hover
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

export default PlacesLivedModal
