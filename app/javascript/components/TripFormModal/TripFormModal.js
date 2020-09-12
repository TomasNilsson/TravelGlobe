import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'
import { Modal, Tabs, Tab, Form, Button } from 'react-bootstrap'
import { format } from 'date-fns'
import classNames from 'classnames'
import TripFormInfo from './TripFormInfo'
import TripFormPlaces from './TripFormPlaces'
import TripFormPhotosVideo from './TripFormPhotosVideo'
import TripFormNotes from './TripFormNotes'
import { myTripsActions } from '../../app/actions'
import { myTripsSelectors } from '../../app/selectors'

const formSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  startDate: yup.date().required('Start date is required').nullable(),
  endDate: yup
    .date()
    .required('End date is required')
    .min(yup.ref('startDate'), "End date can't be before start date")
    .nullable(),
  countries: yup
    .array()
    .required('At least one country/state is required')
    .nullable(),
  places: yup.array().required('At least one place is required').nullable(),
})

const TripFormModal = () => {
  const dispatch = useDispatch()
  const handleClose = () => dispatch(myTripsActions.toggleTripFormModal())

  const formMethods = useForm({
    mode: 'onBlur', // Validation will trigger on the blur event.
    resolver: yupResolver(formSchema),
  })
  const onSubmit = (tripData) => {
    dispatch(
      myTripsActions.addTrip({
        ...tripData,
        start_date: format(tripData.startDate, 'yyyy-MM-dd'),
        end_date: format(tripData.endDate, 'yyyy-MM-dd'),
        country_ids: tripData.countries.map((country) => country.value),
        places_attributes: tripData.places, // TODO: rename to "places" in backend,
      })
    )
  }

  const isOpen = useSelector(myTripsSelectors.getIsTripFormModalOpen)

  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
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
  const isOnLastTab = selectedTabIndex === tabs.length - 1

  return (
    <Modal
      centered
      size="lg"
      backdrop="static"
      show={isOpen}
      onHide={handleClose}
    >
      <FormProvider {...formMethods}>
        <Form noValidate onSubmit={formMethods.handleSubmit(onSubmit)}>
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
              {tabs.map(({ id, title, TabComponent }) => (
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
            {!isOnLastTab && (
              <Button
                variant="primary"
                onClick={() => setSelectedTabIndex(selectedTabIndex + 1)}
              >
                Next
              </Button>
            )}
            <Button
              variant="primary"
              type="submit"
              className={classNames(!isOnLastTab && 'd-none')}
              disabled={!isOnLastTab}
            >
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </FormProvider>
    </Modal>
  )
}

export default TripFormModal
