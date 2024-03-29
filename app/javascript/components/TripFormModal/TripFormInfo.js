import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFormContext, Controller } from 'react-hook-form'
import { Card, Form, Row, Col, InputGroup } from 'react-bootstrap'
import { FaInfoCircle, FaCalendarAlt, FaUser, FaTags } from 'react-icons/fa'
import DatePicker from 'react-datepicker'
import CreatableSelect from 'react-select/creatable'
import classNames from 'classnames'
import { FIELD_NAMES } from './constants'
import { myTripsActions } from '../../app/actions'
import { myTripsSelectors } from '../../app/selectors'
import styles from './TripForm.module.scss'

const TripFormInfo = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext()

  const dispatch = useDispatch()

  const travelPartners = useSelector(myTripsSelectors.getTravelPartners).map(
    (travelPartner) => ({
      value: travelPartner.id,
      label: travelPartner.name,
    })
  )

  const categories = useSelector(myTripsSelectors.getCategories).map(
    (category) => ({
      value: category.id,
      label: category.name,
    })
  )

  useEffect(() => {
    dispatch(myTripsActions.fetchTravelPartners())
    dispatch(myTripsActions.fetchCategories())
  }, [])

  return (
    <Card.Body>
      <Card.Title>Trip Info</Card.Title>
      <Row>
        <Col md={8}>
          <Form.Group controlId={FIELD_NAMES.NAME}>
            <Form.Label>Name</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaInfoCircle />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="E.g. California Road Trip"
                {...register(FIELD_NAMES.NAME)}
                isInvalid={!!errors[FIELD_NAMES.NAME]}
              />
              <Form.Control.Feedback type="invalid">
                {errors[FIELD_NAMES.NAME]?.message}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
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
                    id={FIELD_NAMES.START_DATE}
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
                    id={FIELD_NAMES.END_DATE}
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
      <Row>
        <Col md={8}>
          <Form.Group controlId={FIELD_NAMES.TRAVEL_PARTNERS}>
            <Form.Label>Travel Partners</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Controller
                name={FIELD_NAMES.TRAVEL_PARTNERS}
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    options={travelPartners}
                    isMulti
                    placeholder="Select or create new"
                    className={styles.selectInput}
                    inputId={FIELD_NAMES.TRAVEL_PARTNERS}
                  />
                )}
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Form.Group controlId={FIELD_NAMES.CATEGORIES}>
            <Form.Label>Categories</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaTags />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Controller
                name={FIELD_NAMES.CATEGORIES}
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    options={categories}
                    isMulti
                    placeholder="Select or create new"
                    className={styles.selectInput}
                    inputId={FIELD_NAMES.CATEGORIES}
                  />
                )}
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
    </Card.Body>
  )
}

export default TripFormInfo
