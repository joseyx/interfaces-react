// src/services/AjustesService.js
import api from '../api/axiosInstance'

// Función para obtener los ajustes con ID 1
export const getAjustes = async () => {
  try {
    const response = await api.get('/ajustes/1/')
    return response.data
  } catch (error) {
    throw new Error('Error al obtener los ajustes')
  }
}

// Función para crear ajustes
export const createAjustes = async (ajustesData) => {
  try {
    const ajustes = await getAjustes()
    if (!ajustes) {
      const response = await api.post('/ajustes/', ajustesData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    }
  } catch (error) {
    throw new Error('Error al crear los ajustes')
  }
}

// Función para actualizar ajustes
export const updateAjustes = async (id = 1, ajustesData) => {
  try {
    console.log('ajustesData:', ajustesData)
    const formData = new FormData()
    for (const key in ajustesData) {
      formData.append(key, ajustesData[key])
    }
    console.log('formData:', formData.get('fonts_file'))
    const response = await api.put(`/ajustes/1/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log('Response:', response)
    return response.data
  } catch (error) {
    console.error('Error al actualizar los ajustes:', error)
  }
}

// Función para eliminar ajustes
export const deleteAjustes = async (id = 1) => {
  try {
    const response = await api.delete(`/ajustes/${id}/`)
    return response.data
  } catch (error) {
    throw new Error('Error al eliminar los ajustes')
  }
}
