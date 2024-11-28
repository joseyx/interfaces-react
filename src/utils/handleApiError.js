// src/utils/handleApiError.js
const traducirMensaje = (mensaje) => {
  const traducciones = {
    'email: user with this email already exists.':
      'Email: el usuario con este correo electrónico ya existe.',
    'Passwords do not match': 'Las contraseñas no coinciden',
    'Invalid Credentials': 'Credenciales inválidas',
    "El número de teléfono debe estar en el formato: '+584241234567'.":
      "El número de teléfono debe estar en el formato: '+584241234567'.",
    "['Solo se permite 1 archivo de video.']": 'Solo se permite 1 archivo de video.',
    "['Solo se permite 3 archivos de audio.']": 'Solo se permite 3 archivos de audio.',
    "['Solo se permite 2 archivo de Wysiwyg.']": 'Solo se permite 2 archivo de documento.',
    "['Solo se permite 5 archivos de subtítulo.']": 'Solo se permite 5 archivos de subtítulo.',
    "['Solo se permite 1 archivo manual.']": 'Solo se permite 1 archivo manual.',
    // Agrega más traducciones según sea necesario
  }
  return traducciones[mensaje] || mensaje
}

const handleApiError = (err, setError) => {
  let errorMessage = 'Error desconocido'

  if (err.response && err.response.data) {
    const apiErrors = err.response.data

    if (typeof apiErrors === 'string') {
      errorMessage = apiErrors
    } else if (apiErrors.error) {
      errorMessage = apiErrors.error
    } else {
      errorMessage = Object.keys(apiErrors)
        .map((key) => `${key}: ${apiErrors[key].join(', ')}`)
        .join(' ')
    }

    errorMessage = traducirMensaje(errorMessage)
    setError(errorMessage)
  } else {
    setError('Error de registro')
  }

  return errorMessage // Retorna el mensaje de error traducido
}

export default handleApiError
