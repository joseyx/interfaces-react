import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const Pieza = ({ x, y, rotation, scale = 1, color, shape }) => {
  const styles = {
    fill: color,
    transformOrigin: 'center',
  }

  const renderShape = () => {
    switch (shape) {
      case 'square':
        return <rect x="0" y="0" width="100" height="100" />
      case 'parallelogram':
        return <polygon points="25,0 100,0 75,50 0,50" />
      case 'parallelogramFlipped':
        return <polygon points="0,0 70,0 110,50 40,50" />
      case 'rightTriangle':
        return <polygon points="0,0 100,0 0,100" />
      default:
        return null
    }
  }

  return (
    <motion.svg
      width="100"
      height="100"
      style={styles}
      viewBox="0 0 100 100"
      animate={{ x, y, rotate: rotation, scale }}
      transition={{ duration: 2 }}
    >
      {renderShape()}
    </motion.svg>
  )
}

Pieza.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number,
  rotation: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  shape: PropTypes.string.isRequired,
}

export default Pieza
