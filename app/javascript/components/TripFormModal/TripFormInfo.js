import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Card, Form, Row, Col, InputGroup } from 'react-bootstrap'
import { FaInfoCircle, FaCalendarAlt, FaUser, FaTags } from 'react-icons/fa'
import DatePicker from 'react-datepicker'
import CreatableSelect from 'react-select/creatable'
import classNames from 'classnames'
import { FIELD_NAMES } from './constants'
import styles from './TripForm.module.scss'

const TripFormInfo = () => {
  const { register, errors, control } = useFormContext()
  return (
    <Card.Body>
      <Card.Title>Trip Info</Card.Title>
      <Row>
        <Col md={8}>
          <Form.Group controlId={FIELD_NAMES.NAME}>
            <Form.Label>Name</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaInfoCircle />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="E.g. California Road Trip"
                name={FIELD_NAMES.NAME}
                ref={register}
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
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaCalendarAlt />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Controller
                name={FIELD_NAMES.START_DATE}
                control={control}
                defaultValue={null}
                render={({ onChange, onBlur, value }) => (
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
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaCalendarAlt />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Controller
                name={FIELD_NAMES.END_DATE}
                control={control}
                defaultValue={null}
                render={({ onChange, onBlur, value }) => (
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
                as={CreatableSelect}
                name={FIELD_NAMES.TRAVEL_PARTNERS}
                control={control}
                defaultValue={[]}
                options={[
                  { value: 'Travel Partner 1', label: 'travel_partner_1' },
                  { value: 'Travel Partner 2', label: 'travel_partner_2' },
                  { value: 'Travel Partner 3', label: 'travel_partner_3' },
                ]}
                isMulti
                placeholder="Select from the list or create new"
                className={styles.selectInput}
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
                as={CreatableSelect}
                name={FIELD_NAMES.CATEGORIES}
                control={control}
                defaultValue={[]}
                options={[
                  { value: 'Category 1', label: 'category_1' },
                  { value: 'Category 2', label: 'category_2' },
                  { value: 'Category 3', label: 'category_3' },
                ]}
                isMulti
                placeholder="Select from the list or create new"
                className={styles.selectInput}
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
    </Card.Body>
  )
}

export default TripFormInfo
