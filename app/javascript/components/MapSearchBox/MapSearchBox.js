import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import { mapSelectors } from '../../app/selectors'
import styles from './MapSearchBox.module.scss'

const MapSearchBox = ({
  placeholder = 'Search',
  onSelect,
  clearAfterSelect = false,
}) => {
  const inputRef = useRef(null)
  const isMapsApiLoaded = useSelector(mapSelectors.getIsMapsApiLoaded)

  useEffect(() => {
    if (isMapsApiLoaded) {
      initSearchBox()
    }
  }, [isMapsApiLoaded])

  const initSearchBox = () => {
    const searchBox = new window.google.maps.places.SearchBox(inputRef.current)

    // Listen for the event fired when the user selects an item from the search suggestions
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces()
      if (places.length > 0) {
        const {
          name,
          geometry: { location },
        } = places[0]

        if (typeof onSelect === 'function') {
          onSelect({ name, ...location.toJSON() })
        }

        // Remove focus from the search box
        inputRef.current.blur()

        if (clearAfterSelect) {
          inputRef.current.value = ''
        }
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
