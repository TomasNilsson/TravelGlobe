import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import { mapSelectors } from '../../app/selectors'
import getAddressString from './getAddressString'
import styles from './MapSearchBox.module.scss'

const MapSearchBox = ({
  placeholder = 'Search',
  defaultValue,
  onSelect,
  clearAfterSelect = false,
  isInvalid = false,
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
          address_components: addressComponents,
          formatted_address: formattedAddress,
          geometry: { location },
        } = places[0]

        if (typeof onSelect === 'function') {
          const { lat: latitude, lng: longitude } = location.toJSON()
          onSelect({
            name,
            address: getAddressString(addressComponents, formattedAddress),
            latitude,
            longitude,
          })
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
      defaultValue={defaultValue}
      isInvalid={isInvalid}
    />
  )
}

export default MapSearchBox
