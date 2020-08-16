import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import DataTable from '../DataTable'
import { placesLivedActions } from '../../app/actions'
import { placesLivedSelectors } from '../../app/selectors'

const PlacesLivedModal = ({ isLoggedIn }) => {
  const dispatch = useDispatch()
  const handleClose = () =>
    dispatch(placesLivedActions.togglePlacesLivedModal())
  const setSelectedPlace = (placeId) => {
    dispatch(placesLivedActions.setSelectedPlaceId(placeId))
  }

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
      formatter: (cell) => (
        <Button variant="link" className="p-0">
          {cell}
        </Button>
      ),
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) =>
          setSelectedPlace(row.id),
      },
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
      order: 'desc',
    },
  ]

  return (
    <Modal centered size="xl" show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Places I've Lived</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DataTable
          keyField="id"
          data={placesLived}
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
            Add New Place
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default PlacesLivedModal
