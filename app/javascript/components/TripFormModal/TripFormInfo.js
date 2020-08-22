import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Card, Form, Row, Col, InputGroup } from 'react-bootstrap'
import { FaInfoCircle, FaCalendarAlt, FaUser, FaTags } from 'react-icons/fa'
import DatePicker from 'react-datepicker'
import CreatableSelect from 'react-select/creatable'
import styles from './TripForm.module.scss'

const TripFormInfo = () => {
  const { register, control } = useFormContext()
  return (
    <Card.Body>
      <Card.Title>Trip Info</Card.Title>
      <Row>
        <Col md={8}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaInfoCircle />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="E.g. California Road Trip"
                name="name"
                ref={register}
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaCalendarAlt />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Controller
                name="start_date"
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
                    className="form-control"
                  />
                )}
              />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaCalendarAlt />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Controller
                name="end_date"
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
                    className="form-control"
                  />
                )}
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Form.Group controlId="travelPartners">
            <Form.Label>Travel Partners</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Controller
                as={CreatableSelect}
                name="travel_partners"
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
          <Form.Group controlId="categories">
            <Form.Label>Categories</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaTags />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Controller
                as={CreatableSelect}
                name="categories"
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
