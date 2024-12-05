// src/utils/handleApiError.js
const traducirMensaje = (mensaje) => {
  const traducciones = {
    'email: user with this email already exists.':
      'Email: Ya existe un usuario con este correo electrónico.',
    'user with this email already exists.': 'Ya existe un usuario con este correo electrónico.',
    'Passwords do not match': 'Las contraseñas no coinciden',
    'Invalid Credentials': 'Credenciales inválidas',
    "El número de teléfono debe estar en el formato: '+584241234567'.":
      "El número de teléfono debe estar en el formato: '+584241234567'.",
    "['Solo se permite 1 archivo de video.']": 'Solo se permite 1 archivo de video.',
    "['Solo se permite 3 archivos de audio.']": 'Solo se permite 3 archivos de audio.',
    "['Solo se permite 2 archivo de Wysiwyg.']": 'Solo se permite 2 archivo de documento.',
    "['Solo se permite 5 archivos de subtítulo.']": 'Solo se permite 5 archivos de subtítulo.',
    "['Solo se permite 1 archivo manual.']": 'Solo se permite 1 archivo manual.',
    '"error":"Invalid Credentials"': 'Credenciales inválidas',
    'email: Enter a valid email address.':
      'Email: Introduce una dirección de correo electrónico válida.',
    '0: First name and last name cannot be empty.': 'El nombre y apellido no pueden estar vacíos.',
    'password: This field may not be blank.': 'La contraseña no puede estar vacia',
    'password: This field may not be blank. email: user with this email already exists.':
      'La contraseña no puede estar vacia, el email ya existe',
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
        .map((key) => {
          const value = apiErrors[key]
          return `${key}: ${Array.isArray(value) ? value.join(', ') : value}`
        })
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
