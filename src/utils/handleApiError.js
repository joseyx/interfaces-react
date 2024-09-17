// src/utils/handleApiError.js
const traducirMensaje = (mensaje) => {
  const traducciones = {
    'email: user with this email already exists.':
      'Email: el usuario con este correo electrónico ya existe.',
    'Passwords do not match': 'Las contraseñas no coinciden',
    'Invalid Credentials': 'Credenciales inválidas',
    "El número de teléfono debe estar en el formato: '+584241234567'.":
      "El número de teléfono debe estar en el formato: '+584241234567'.",
    // Agrega más traducciones según sea necesario
  }
  return traducciones[mensaje] || mensaje
}

const handleApiError = (err, setError) => {
  if (err.response && err.response.data) {
    const apiErrors = err.response.data
    let errorMessage = ''

    if (typeof apiErrors === 'string') {
      errorMessage = apiErrors
    } else if (apiErrors.error) {
      errorMessage = apiErrors.error
    } else {
      errorMessage = Object.keys(apiErrors)
        .map((key) => `${key}: ${apiErrors[key].join(', ')}`)
        .join(' ')
    }

    setError(new Error(traducirMensaje(errorMessage)))
  } else {
    setError(new Error('Error de registro'))
  }
  console.error('Error:', err)
}

export default handleApiError
