import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Card, Form, Row, Col, InputGroup } from 'react-bootstrap'
import { FaGlobeEurope, FaMapMarkerAlt } from 'react-icons/fa'
import Select from 'react-select'
import styles from './TripForm.module.scss'

const TripFormPlaces = () => {
  const { register, control } = useFormContext()
  return (
    <Card.Body>
      <Card.Title>Select Places</Card.Title>
      <Row>
        <Col md={8}>
          <Form.Group controlId="countries">
            <Form.Label>Countries/States</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaGlobeEurope />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Controller
                as={Select}
                name="countries"
                control={control}
                defaultValue={[]}
                options={[
                  { value: 'Country 1', label: 'country_1' },
                  { value: 'Country 2', label: 'country_2' },
                  { value: 'Country 3', label: 'country_3' },
                ]}
                isMulti
                placeholder="Select one or many countries/states"
                className={styles.selectInput}
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Form.Group controlId="places">
            <Form.Label>Places</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaMapMarkerAlt />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="Enter a location"
                name="places"
                ref={register}
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
    </Card.Body>
  )
}

export default TripFormPlaces
