import React from 'react'
import { FaMapMarker, FaHome } from 'react-icons/fa'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import styles from './MapMarker.module.scss'

// GoogleMap passes a $hover prop to hovered components
const MapMarker = ({ text, icon = 'standard', label, $hover }) => (
  <OverlayTrigger placement="bottom" overlay={<Tooltip>{text}</Tooltip>}>
    {icon === 'house' ? (
      <FaHome className={`${styles.marker} ${$hover ? styles.hover : ''}`} />
    ) : (
      <div>
        <FaMapMarker
          className={`${styles.marker} ${$hover ? styles.hover : ''}`}
        />
        <span className={styles.markerLabel}>{label || '⬤'}</span>
      </div>
    )}
  </OverlayTrigger>
)

export default MapMarker
