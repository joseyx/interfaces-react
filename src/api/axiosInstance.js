import axios from 'axios'

// Define la URL base para la API
const baseURL = 'http://127.0.0.1:8000/api/'

// Crea una instancia de axios con la configuración base
const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar el token de autorización a las solicitudes
api.interceptors.request.use(
  (config) => {
    // Obtiene el token de acceso del almacenamiento local
    const token = localStorage.getItem('accessToken')
    // Si hay un token y la URL no incluye ‘/auth/register', agrega el token a los encabezados
    if (token && !config.url.includes('/users/token') && !config.url.includes('/users/login')) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error instanceof Error ? error : new Error(String(error)))
  },
)

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Si la respuesta es 401 (no autorizado), intenta refrescar el token
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        try {
          // Solícita un nuevo token de acceso usando el token de refresco
          const response = await axios.post(`${baseURL}users/token/refresh/`, {
            refresh: refreshToken,
          })

          const newAccessToken = response.data.access

          // Guarda el nuevo token de acceso en el almacenamiento local
          localStorage.setItem('accessToken', newAccessToken)

          // Actualiza el encabezado de autorización con el nuevo token
          api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`

          // Reintenta la solicitud original con el nuevo token
          return await api(originalRequest)
        } catch (error) {
          console.error('Refresh token error:', error)
          return Promise.reject(error instanceof Error ? error : new Error(String(error)))
        }
      }

      return Promise.reject(error instanceof Error ? error : new Error(String(error)))
    }
    return Promise.reject(error instanceof Error ? error : new Error(String(error)))
  },
)

export default api
