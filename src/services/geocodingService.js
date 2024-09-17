// services/geocodingService.js
import axios from 'axios'

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/reverse?format=json'

export const fetchLocationData = async (lat, lng) => {
  try {
    const response = await axios.get(NOMINATIM_BASE_URL, {
      params: {
        lat: lat,
        lon: lng,
      },
    })

    const data = response.data

    return {
      city: data.address.city || '',
      state: data.address.state || '',
      country: data.address.country || '',
      road: data.address.road || '',
      postcode: data.address.postcode || '',
    }
  } catch (error) {
    console.error('Error fetching location data:', error)
    return { city: '', state: '', country: '', road: '', postcode: '' }
  }
}
