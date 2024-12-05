// src/services/UserService.js
import api from '../api/axiosInstance'

export const getAllUsers = async () => {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (error) {
    throw new Error('Error al obtener los usuarios')
  }
}

// get user by id
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Error al obtener el usuario')
  }
}

// Actualizar usuario por ID
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}/update-profile/`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error al actualizar el usuario:', error)
    throw error
  }
}

// get logged in user
export const getLoggedInUser = async () => {
  try {
    const response = await api.get('/users/me')
    return response.data
  } catch (error) {
    throw new Error('Error al obtener el usuario')
  }
}
