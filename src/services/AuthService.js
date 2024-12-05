// src/services/AuthService.js
import api from '../api/axiosInstance'

// Función para registrar un nuevo usuario
export const register = async (userData) => {
  try {
    // Envía una solicitud POST a la API para registrar al usuario
    const response = await api.post('/users/register/', userData)
    return response.data
  } catch (error) {
    console.error('Failed to register user', error)
    throw error
  }
}

// Función para iniciar sesión
export const login = async (userData) => {
  try {
    // Envía una solicitud POST a la API para iniciar sesión
    const response = await api.post('/users/login/', userData)
    const { access, refresh } = response.data

    // Guarda el token de acceso en el almacenamiento local
    localStorage.setItem('accessToken', access)
    // Guarda el token de refresco en el almacenamiento local
    localStorage.setItem('refreshToken', refresh)

    return response.data
  } catch (error) {
    throw error
  }
}

// Función para cerrar sesión
export const logout = async () => {
  try {
    // Elimina el token de acceso del almacenamiento local
    localStorage.removeItem('accessToken')
    // Elimina el token de refresco del almacenamiento local
    localStorage.removeItem('refreshToken')
  } catch (error) {
    console.error('Failed to logout user', error)
    throw error
  }
}
