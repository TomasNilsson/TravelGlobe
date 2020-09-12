import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFormContext, useFieldArray, Controller } from 'react-hook-form'
import { Card, Form, Row, Col, InputGroup, ListGroup } from 'react-bootstrap'
import { FaGlobeEurope, FaMapMarkerAlt } from 'react-icons/fa'
import Select from 'react-select'
import classNames from 'classnames'
import { mapSelectors } from '../../app/selectors'
import MapSearchBox from '../MapSearchBox'
import styles from './TripForm.module.scss'
import { mapActions } from '../../app/actions'

const TripFormPlaces = () => {
  const { register, trigger, errors, control } = useFormContext()
  const { fields: places, append: appendPlaces } = useFieldArray({
    control,
    name: 'places',
  })

  useEffect(() => {
    if (places.length) trigger('places') // Trigger valiation when places are added/removed
  }, [places])

  const dispatch = useDispatch()

  const countries = useSelector(mapSelectors.getCountries).map((country) => ({
    value: country.id,
    label: country.name,
  }))

  useEffect(() => {
    dispatch(mapActions.fetchCountries())
  }, [])

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
                options={countries}
                isMulti
                placeholder="Select one or many countries/states"
                className={classNames(
                  styles.selectInput,
                  !!errors.countries && ['is-invalid', styles.error]
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.countries?.message}
              </Form.Control.Feedback>
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
              <MapSearchBox
                placeholder="Enter a location"
                onSelect={(location) => appendPlaces(location)}
                clearAfterSelect
                isInvalid={!!errors.places}
              />
              <Form.Control.Feedback type="invalid">
                {errors.places?.message}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      <ListGroup as="ol">
        {places.map((place, index) => (
          <ListGroup.Item as="li" key={place.name}>
            {place.name}
            <Form.Control
              type="hidden"
              name={`places[${index}].name`}
              ref={register}
              defaultValue={place.name}
            />
            <Form.Control
              type="hidden"
              name={`places[${index}].latitude`}
              ref={register}
              defaultValue={place.lat}
            />
            <Form.Control
              type="hidden"
              name={`places[${index}].longitude`}
              ref={register}
              defaultValue={place.lng}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card.Body>
  )
}

export default TripFormPlaces
