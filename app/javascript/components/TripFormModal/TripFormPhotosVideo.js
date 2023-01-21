import React, { useEffect, useState } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import {
  Button,
  Card,
  Form,
  Row,
  Col,
  Image,
  InputGroup,
  Table,
} from 'react-bootstrap'
import { FaPhotoVideo, FaTrash } from 'react-icons/fa'
import { FIELD_NAMES } from './constants'
import styles from './TripForm.module.scss'

const TripFormPhotosVideo = () => {
  const { register, trigger, control } = useFormContext()
  const {
    fields: photos,
    append: appendPhotos,
    remove: removePhoto,
  } = useFieldArray({
    control,
    name: FIELD_NAMES.PHOTOS,
    keyName: 'key',
  })

  const [googlePhotosUrl, setGooglePhotosUrl] = useState('')

  useEffect(() => {
    if (photos.length) trigger(FIELD_NAMES.PHOTOS) // Trigger validation when places are added/removed
  }, [photos])

  const fetchGooglePhotos = () => {
    fetch('/photos/extract_from_google_photos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ albumUrl: googlePhotosUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        appendPhotos(data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <Card.Body>
      <Card.Title>Add Photos/Videos</Card.Title>
      <Row>
        <Col md={8}>
          <Form.Group controlId={FIELD_NAMES.PHOTOS}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaPhotoVideo />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="https://photos.app.goo.gl/..."
                value={googlePhotosUrl}
                onChange={(e) => setGooglePhotosUrl(e.target.value)}
              />
              <InputGroup.Append>
                <Button disabled={!googlePhotosUrl} onClick={fetchGooglePhotos}>
                  Import
                </Button>
              </InputGroup.Append>
            </InputGroup>
            <Form.Text muted>
              Enter{' '}
              <a
                href="https://support.google.com/photos/answer/6131416#zippy=%2Csend-a-link-or-share-through-other-apps"
                target="_blank"
                rel="noreferrer"
              >
                link to shared photo, video or album from Google Photos
              </a>
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>
      {photos.length > 0 && (
        <Table hover responsive>
          <tbody>
            {photos.map((photo, index) => (
              <tr key={photo.key}>
                <td>
                  <Image
                    src={photo.thumbUrl}
                    thumbnail
                    className={styles.thumbnail}
                    referrerPolicy="no-referrer"
                  />
                </td>
                <td>
                  <Form.Control
                    {...register(`${FIELD_NAMES.PHOTOS}[${index}].caption`)}
                    placeholder="Caption"
                    defaultValue={photo.caption}
                  />
                  <Form.Control
                    type="hidden"
                    {...register(`${FIELD_NAMES.PHOTOS}[${index}].id`)}
                    defaultValue={photo.id}
                  />
                  <Form.Control
                    type="hidden"
                    {...register(`${FIELD_NAMES.PHOTOS}[${index}].imageUrl`)}
                    defaultValue={photo.imageUrl}
                  />
                  <Form.Control
                    type="hidden"
                    {...register(`${FIELD_NAMES.PHOTOS}[${index}].thumbUrl`)}
                    defaultValue={photo.thumbUrl}
                  />
                </td>
                <td>
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() => removePhoto(index)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card.Body>
  )
}

export default TripFormPhotosVideo
