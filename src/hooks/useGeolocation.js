// hooks/useGeolocation.js
import { useState } from 'react'
import { fetchLocationData } from '../services/geocodingService'

const useGeolocation = () => {
  const [locationInfo, setLocationInfo] = useState({
    city: '',
    state: '',
    country: '',
    road: '',
    postcode: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getLocationInfo = async (lat, lng) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchLocationData(lat, lng)
      setLocationInfo(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { locationInfo, loading, error, getLocationInfo }
}

export default useGeolocation
