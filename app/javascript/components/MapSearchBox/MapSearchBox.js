import React, { useRef, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import styles from './MapSearchBox.module.scss'

const MapSearchBox = ({ mapsApi, map, placeholder = 'Search' }) => {
  const inputRef = useRef(null)

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

        // Zoom in on the selected place
        if (viewport) {
          map.fitBounds(viewport)
        } else {
          map.setCenter(location)
          map.setZoom(9)
        }

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
