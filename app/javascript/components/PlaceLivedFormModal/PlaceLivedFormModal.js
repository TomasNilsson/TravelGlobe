import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Modal, Form, Row, Col, InputGroup, Button } from 'react-bootstrap'
import { FaGlobeEurope, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import { format, parseISO } from 'date-fns'
import classNames from 'classnames'
import MapSearchBox from '../MapSearchBox'
import { FIELD_NAMES } from './constants'
import styles from './PlaceLivedFormModal.module.scss'
import { mapActions, placesLivedActions } from '../../app/actions'
import { mapSelectors, placesLivedSelectors } from '../../app/selectors'

const formSchema = yup.object().shape({
  [FIELD_NAMES.COUNTRY]: yup.object().shape({
    value: yup.string().required('Country/state is required'),
  }),
  [FIELD_NAMES.ADDRESS]: yup.string().required('Address is required'),
  [FIELD_NAMES.START_DATE]: yup
    .date()
    .required('Start date is required')
    .nullable(),
  [FIELD_NAMES.END_DATE]: yup
    .date()
    .required('End date is required')
    .min(yup.ref(FIELD_NAMES.START_DATE), "End date can't be before start date")
    .nullable(),
})

const PlaceLivedFormModal = () => {
  const dispatch = useDispatch()
  const handleClose = () =>
    dispatch(placesLivedActions.togglePlaceLivedFormModal())
  const isOpen = useSelector(placesLivedSelectors.getIsPlaceLivedFormModalOpen)
  const { id, country, address, latitude, longitude, startDate, endDate } =
    useSelector(placesLivedSelectors.getPlaceInfoForSelectedId) || {}

  useEffect(() => {
    dispatch(mapActions.fetchCountries())
  }, [])

  const countries = useSelector(mapSelectors.getCountries).map((country) => ({
    value: country.id,
    label: country.name,
  }))

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur', // Validation will trigger on the blur event.
    resolver: yupResolver(formSchema),
  })

  const setDefaultValues = () => {
    // Reset the form if no selected place. Set default values for form when editing a place.
    reset({
      [FIELD_NAMES.COUNTRY]: country
        ? {
            value: country.id,
            label: country.name,
          }
        : null,
      [FIELD_NAMES.ADDRESS]: address,
      [FIELD_NAMES.LATITUDE]: latitude,
      [FIELD_NAMES.LONGITUDE]: longitude,
      [FIELD_NAMES.START_DATE]: startDate ? parseISO(startDate) : null,
      [FIELD_NAMES.END_DATE]: endDate ? parseISO(endDate) : null,
    })
  }

  useEffect(() => {
    setDefaultValues()
  }, [id])

  const onSubmit = (placeData) => {
    const placePayload = {
      ...placeData,
      country_id: placeData[FIELD_NAMES.COUNTRY].value,
      start_date: format(placeData[FIELD_NAMES.START_DATE], 'yyyy-MM-dd'),
      end_date: format(placeData[FIELD_NAMES.END_DATE], 'yyyy-MM-dd'),
    }
    dispatch(
      id
        ? placesLivedActions.updatePlaceLived({ id, ...placePayload })
        : placesLivedActions.addPlaceLived(placePayload)
    )
  }

  const setAddress = (location) => {
    setValue(FIELD_NAMES.LATITUDE, location.latitude)
    setValue(FIELD_NAMES.LONGITUDE, location.longitude)
    setValue(FIELD_NAMES.ADDRESS, location.address, { shouldValidate: true })
  }

  return (
    <Modal
      centered
      size="lg"
      backdrop="static"
      show={isOpen}
      onHide={handleClose}
      onExited={setDefaultValues}
    >
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {id ? "Edit Place I've Lived" : "New Place I've Lived"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={8}>
              <Form.Group controlId={FIELD_NAMES.COUNTRY}>
                <Form.Label>Country/State</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <FaGlobeEurope />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Controller
                    name={FIELD_NAMES.COUNTRY}
                    control={control}
                    defaultValue={{}}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={countries}
                        placeholder="Select a country"
                        className={classNames(
                          styles.selectInput,
                          !!errors[FIELD_NAMES.COUNTRY] && [
                            'is-invalid',
                            styles.error,
                          ]
                        )}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors[FIELD_NAMES.COUNTRY]?.value?.message}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Form.Group controlId={FIELD_NAMES.ADDRESS}>
                <Form.Label>Address</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <FaMapMarkerAlt />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <MapSearchBox
                    placeholder="Enter a location"
                    defaultValue={address}
                    onSelect={setAddress}
                    isInvalid={!!errors[FIELD_NAMES.ADDRESS]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors[FIELD_NAMES.ADDRESS]?.message}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Control type="hidden" {...register(FIELD_NAMES.ADDRESS)} />
              <Form.Control type="hidden" {...register(FIELD_NAMES.LATITUDE)} />
              <Form.Control
                type="hidden"
                {...register(FIELD_NAMES.LONGITUDE)}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId={FIELD_NAMES.START_DATE}>
                <Form.Label>Start Date</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <FaCalendarAlt />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Controller
                    name={FIELD_NAMES.START_DATE}
                    control={control}
                    defaultValue={null}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <DatePicker
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Click to select a date"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        wrapperClassName={classNames(
                          styles.datePickerWrapper,
                          !!errors[FIELD_NAMES.START_DATE] && 'is-invalid'
                        )}
                        className={classNames(
                          'form-control',
                          !!errors[FIELD_NAMES.START_DATE] && 'is-invalid'
                        )}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors[FIELD_NAMES.START_DATE]?.message}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId={FIELD_NAMES.END_DATE}>
                <Form.Label>End Date</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <FaCalendarAlt />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Controller
                    name={FIELD_NAMES.END_DATE}
                    control={control}
                    defaultValue={null}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <DatePicker
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Click to select a date"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        wrapperClassName={classNames(
                          styles.datePickerWrapper,
                          !!errors[FIELD_NAMES.END_DATE] && 'is-invalid'
                        )}
                        className={classNames(
                          'form-control',
                          !!errors[FIELD_NAMES.END_DATE] && 'is-invalid'
                        )}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors[FIELD_NAMES.END_DATE]?.message}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default PlaceLivedFormModal
