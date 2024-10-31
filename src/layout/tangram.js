import React, { useState, useEffect } from 'react'
import Pieza from './figuras/pieza'
import { initialPositions, finalPositions, secondPosition } from './figuras/config'
import PropTypes from 'prop-types'

const Tangram = ({ color = 'blue' }) => {
  const [positions, setPositions] = useState(initialPositions)

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prevPositions) => {
        if (prevPositions === initialPositions) return secondPosition
        if (prevPositions === secondPosition) return finalPositions
        return initialPositions
      })
    }, 7000) // Cambia de posicion cada 7 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div style={{ position: 'relative', width: '500px', height: '500px' }}>
        {positions.map((pos, index) => (
          <Pieza
            key={index}
            x={pos.x}
            y={pos.y}
            rotation={pos.rotation}
            shape={pos.shape}
            color={color}
            scale={pos.scale}
          />
        ))}
      </div>
    </>
  )
}

Tangram.propTypes = {
  color: PropTypes.string,
}

export default Tangram
