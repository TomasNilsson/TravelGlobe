import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, FormProvider } from 'react-hook-form'
import { Modal, Tabs, Tab, Form, Button } from 'react-bootstrap'
import TripFormInfo from './TripFormInfo'
import TripFormPlaces from './TripFormPlaces'
import TripFormPhotosVideo from './TripFormPhotosVideo'
import TripFormNotes from './TripFormNotes'
import { myTripsActions } from '../../app/actions'
import { myTripsSelectors } from '../../app/selectors'

const TripFormModal = () => {
  const dispatch = useDispatch()
  const handleClose = () => dispatch(myTripsActions.toggleTripFormModal())

  const formMethods = useForm()
  const onSubmit = (data) => console.log(data) // TODO: dispatch action

  const [selectedTabIndex, setSelectedTabIndex] = useState(0)

  const isOpen = useSelector(myTripsSelectors.getIsTripFormModalOpen)

  const tabs = [
    { id: 'info', title: 'Info', TabComponent: TripFormInfo },
    { id: 'places', title: 'Places', TabComponent: TripFormPlaces },
    {
      id: 'photosVideo',
      title: 'Photos/Videos',
      TabComponent: TripFormPhotosVideo,
    },
    { id: 'notes', title: 'Notes', TabComponent: TripFormNotes },
  ]

  return (
    <Modal
      centered
      size="lg"
      backdrop="static"
      show={isOpen}
      onHide={handleClose}
    >
      <FormProvider {...formMethods}>
        <Form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>New Trip</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs
              activeKey={tabs[selectedTabIndex].id}
              onSelect={(tabId) =>
                setSelectedTabIndex(tabs.findIndex((tab) => tab.id === tabId))
              }
            >
              {tabs.map(({ id, title, TabComponent }, index) => (
                <Tab eventKey={id} key={id} title={title}>
                  <TabComponent />
                </Tab>
              ))}
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {selectedTabIndex < tabs.length - 1 ? (
              <Button
                variant="primary"
                onClick={() => setSelectedTabIndex(selectedTabIndex + 1)}
              >
                Next
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                Save
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </FormProvider>
    </Modal>
  )
}

export default TripFormModal
