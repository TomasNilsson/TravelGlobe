import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'
import { Modal, Tabs, Tab, Form, Button } from 'react-bootstrap'
import { format, parseISO } from 'date-fns'
import classNames from 'classnames'
import { FIELD_NAMES } from './constants'
import TripFormInfo from './TripFormInfo'
import TripFormPlaces from './TripFormPlaces'
import TripFormPhotosVideo from './TripFormPhotosVideo'
import TripFormNotes from './TripFormNotes'
import { myTripsActions } from '../../app/actions'
import { myTripsSelectors } from '../../app/selectors'

const formSchema = yup.object().shape({
  [FIELD_NAMES.NAME]: yup.string().required('Name is required'),
  [FIELD_NAMES.START_DATE]: yup
    .date()
    .required('Start date is required')
    .nullable(),
  [FIELD_NAMES.END_DATE]: yup
    .date()
    .required('End date is required')
    .min(yup.ref(FIELD_NAMES.START_DATE), "End date can't be before start date")
    .nullable(),
  [FIELD_NAMES.COUNTRIES]: yup
    .array()
    .required('At least one country/state is required')
    .nullable(),
  [FIELD_NAMES.PLACES]: yup
    .array()
    .required('At least one place is required')
    .nullable(),
})

const TripFormModal = () => {
  const dispatch = useDispatch()
  const handleClose = () => dispatch(myTripsActions.toggleTripFormModal())
  const isOpen = useSelector(myTripsSelectors.getIsTripFormModalOpen)
  const {
    id,
    name,
    startDate,
    endDate,
    countries = [],
    places = [],
    extraInfoLoaded,
  } = useSelector(myTripsSelectors.getTripInfoForSelectedId) || {}

  const formMethods = useForm({
    mode: 'onBlur', // Validation will trigger on the blur event.
    resolver: yupResolver(formSchema),
  })

  useEffect(() => {
    if (id) {
      // Set default values for form when editing a trip
      formMethods.reset({
        [FIELD_NAMES.NAME]: name,
        [FIELD_NAMES.START_DATE]: parseISO(startDate),
        [FIELD_NAMES.END_DATE]: parseISO(endDate),
        [FIELD_NAMES.COUNTRIES]: countries.map((country) => ({
          value: country.id,
          label: country.name,
        })),
        [FIELD_NAMES.PLACES]: places,
      })
    }
  }, [id, extraInfoLoaded])

  const onValidSubmit = (tripData) => {
    const tripPayload = {
      ...tripData,
      start_date: format(tripData[FIELD_NAMES.START_DATE], 'yyyy-MM-dd'),
      end_date: format(tripData[FIELD_NAMES.END_DATE], 'yyyy-MM-dd'),
      country_ids: tripData[FIELD_NAMES.COUNTRIES].map(
        (country) => country.value
      ),
      places_attributes: tripData[FIELD_NAMES.PLACES], // TODO: rename to "places" in backend,
    }
    dispatch(
      id
        ? myTripsActions.updateTrip({ id, ...tripPayload })
        : myTripsActions.addTrip(tripPayload)
    )
  }

  const onInvalidSubmit = (fieldErrors = {}) => {
    // Open the first tab with errors
    setSelectedTabIndex(
      Object.keys(fieldErrors).some((field) =>
        [
          FIELD_NAMES.NAME,
          FIELD_NAMES.START_DATE,
          FIELD_NAMES.END_DATE,
        ].includes(field)
      )
        ? 0
        : 1
    )
  }

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

  const onModalExited = () => {
    setSelectedTabIndex(0)
    formMethods.reset()
  }

  return (
    <Modal
      centered
      size="lg"
      backdrop="static"
      show={isOpen}
      onHide={handleClose}
      onExited={onModalExited}
    >
      <FormProvider {...formMethods}>
        <Form
          noValidate
          onSubmit={formMethods.handleSubmit(onValidSubmit, onInvalidSubmit)}
        >
          <Modal.Header closeButton>
            <Modal.Title>{id ? 'Edit Trip' : 'New Trip'}</Modal.Title>
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
