import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'
import DataTable from '../DataTable'
import { placesLivedActions } from '../../app/actions'
import { placesLivedSelectors, userSelectors } from '../../app/selectors'

const PlacesLivedModal = () => {
  const dispatch = useDispatch()
  const handleClose = () =>
    dispatch(placesLivedActions.togglePlacesLivedModal())
  const setSelectedPlace = (placeId) => {
    dispatch(placesLivedActions.setSelectedPlaceId(placeId))
  }
  const showPlaceLivedForm = (placeId) =>
    dispatch(placesLivedActions.showPlaceLivedForm(placeId))

  const isOpen = useSelector(placesLivedSelectors.getIsPlacesLivedModalOpen)
  const placesLived = useSelector(placesLivedSelectors.getPlacesLived)
  const isLoggedIn = useSelector(userSelectors.getIsLoggedIn)

  const dateFormatter = ({ startDate, endDate }) => `${startDate} - ${endDate}`

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
      dataField: 'address',
      text: 'Address',
      sort: true,
      formatter: (cell, row) => (
        <Button
          variant="link"
          className="p-0"
          onClick={() => setSelectedPlace(row.id)}
        >
          {cell}
        </Button>
      ),
    },
    {
      dataField: 'country',
      text: 'Country/State',
      sort: true,
      formatter: (country) => country?.name,
      sortValue: (country) => country?.name,
      filterValue: (country) => country?.name,
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
          onClick={() => showPlaceLivedForm(row.id)}
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
        <Modal.Title>{"Places I've Lived"}</Modal.Title>
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
        <Button variant="outline-secondary" onClick={handleClose}>
          Close
        </Button>
        {isLoggedIn && (
          <Button variant="primary" onClick={() => showPlaceLivedForm()}>
            Add New Place
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default PlacesLivedModal
