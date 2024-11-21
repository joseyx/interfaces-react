import React, { useState, useEffect, useRef } from 'react'
import Pieza from './figuras/pieza'
import { initialPositions, finalPositions, secondPosition } from './figuras/config'
import PropTypes from 'prop-types'
import useArchivos from 'src/hooks/useArchivos'

const Tangram = ({ color = 'blue' }) => {
  const [positions, setPositions] = useState(initialPositions)
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0)
  const { audios, loading } = useArchivos()
  const audioRef = useRef(null) // Ref para el elemento audio

  useEffect(() => {
    if (!loading && audios.length > 0) {
      const interval = setInterval(() => {
        setPositions((prevPositions) => {
          if (prevPositions === initialPositions) {
            setCurrentAudioIndex(1)
            return secondPosition
          }
          if (prevPositions === secondPosition) {
            setCurrentAudioIndex(2)
            return finalPositions
          }
          setCurrentAudioIndex(0)
          return initialPositions
        })
      }, 7000) // Change position every 7 seconds

      return () => clearInterval(interval)
    }
  }, [loading, audios])

  useEffect(() => {
    if (!loading && audios.length > 0 && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.load() // Recargar el archivo de audio
      audioRef.current.play().catch((error) => {
        console.error('Error reproduciendo audio:', error)
      })
    }
  }, [currentAudioIndex, loading, audios])

  if (loading || audios.length === 0) {
    return <div>Loading...</div>
  }

  return (
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
      <audio
        ref={audioRef}
        onCanPlay={() => console.log('Audio listo para reproducir')}
        onError={(e) => console.error('Error en audio:', e.target.error)}
      >
        <source src={audios[currentAudioIndex]?.archivo} type="audio/mp3" />
      </audio>
    </div>
  )
}

Tangram.propTypes = {
  color: PropTypes.string,
}

export default Tangram
