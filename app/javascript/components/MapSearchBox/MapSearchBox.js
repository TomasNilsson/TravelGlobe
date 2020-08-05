import React, { useRef, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { mapActions } from '../../app/actions'
import styles from './MapSearchBox.module.scss'

const MapSearchBox = ({ mapsApi, map, placeholder = 'Search' }) => {
  const inputRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (mapsApi && map) {
      initSearchBox()
    }
  }, [mapsApi])

  const initSearchBox = () => {
    const searchBox = new mapsApi.places.SearchBox(inputRef.current)

    // Bias the SearchBox results towards current map's viewport
    map.addListener('bounds_changed', function () {
      searchBox.setBounds(map.getBounds())
    })

    // Listen for the event fired when the user selects an item from the search suggestions
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces()
      if (places.length > 0) {
        const {
          name,
          geometry: { location, viewport },
        } = places[0]

        dispatch(mapActions.setMarkers([{ ...location.toJSON(), text: name }]))

        // Remove focus from the search box
        inputRef.current.blur()
      }
    })
  }

  return (
    <Form.Control
      ref={inputRef}
      type="text"
      className={styles.searchBox}
      placeholder={placeholder}
    />
  )
}

export default MapSearchBox
