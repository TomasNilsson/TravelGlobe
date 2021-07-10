import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFormContext, useFieldArray, Controller } from 'react-hook-form'
import { Card, Form, Row, Col, InputGroup, ListGroup } from 'react-bootstrap'
import { FaGlobeEurope, FaMapMarkerAlt } from 'react-icons/fa'
import Select from 'react-select'
import classNames from 'classnames'
import { FIELD_NAMES } from './constants'
import { mapSelectors } from '../../app/selectors'
import MapSearchBox from '../MapSearchBox'
import styles from './TripForm.module.scss'
import { mapActions } from '../../app/actions'

const TripFormPlaces = () => {
  const {
    register,
    trigger,
    formState: { errors },
    control,
  } = useFormContext()
  const { fields: places, append: appendPlaces } = useFieldArray({
    control,
    name: FIELD_NAMES.PLACES,
    keyName: 'key',
  })

  useEffect(() => {
    if (places.length) trigger(FIELD_NAMES.PLACES) // Trigger validation when places are added/removed
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
    <Card.Body data-testid="placesTab">
      <Card.Title>Select Places</Card.Title>
      <Row>
        <Col md={8}>
          <Form.Group controlId={FIELD_NAMES.COUNTRIES}>
            <Form.Label>Countries/States</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaGlobeEurope />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Controller
                name={FIELD_NAMES.COUNTRIES}
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={countries}
                    isMulti
                    placeholder="Select one or many countries/states"
                    className={classNames(
                      styles.selectInput,
                      !!errors[FIELD_NAMES.COUNTRIES] && [
                        'is-invalid',
                        styles.error,
                      ]
                    )}
                    inputId={FIELD_NAMES.COUNTRIES}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors[FIELD_NAMES.COUNTRIES]?.message}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Form.Group controlId={FIELD_NAMES.PLACES}>
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
                isInvalid={!!errors[FIELD_NAMES.PLACES]}
              />
              <Form.Control.Feedback type="invalid">
                {errors[FIELD_NAMES.PLACES]?.message}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      <ListGroup as="ol">
        {places.map((place, index) => (
          <ListGroup.Item as="li" key={place.key}>
            {place.name}
            <Form.Control
              type="hidden"
              {...register(`places[${index}].id`)}
              defaultValue={place.id}
            />
            <Form.Control
              type="hidden"
              {...register(`places[${index}].name`)}
              defaultValue={place.name}
            />
            <Form.Control
              type="hidden"
              {...register(`places[${index}].latitude`)}
              defaultValue={place.latitude}
            />
            <Form.Control
              type="hidden"
              {...register(`places[${index}].longitude`)}
              defaultValue={place.longitude}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card.Body>
  )
}

export default TripFormPlaces
