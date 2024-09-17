// src/hooks/useRegisterForm.js
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/AuthService'
import handleApiError from 'src/utils/handleApiError'

const useRegisterForm = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    repeat_password: '',
  })

  // Estado para almacenar errores
  const [error, setError] = useState(null)
  // Estado para manejar el estado de carga
  const [isLoading, setIsLoading] = useState(false)
  // Hook para redirigir a otra página
  const navigate = useNavigate()

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    setError(null) // Limpia el error cuando el usuario modifica cualquier campo
  }

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Verífica si las contraseñas coinciden
    if (formData.password !== formData.repeat_password) {
      setError(new Error('Las contraseñas no coinciden'))
      return
    }

    setIsLoading(true)
    try {
      // Intenta registrar al usuario
      const data = await register(formData)
      console.log('Registro exitoso', data)
      navigate('/login') // Redirige al login después de un registro exitoso
    } catch (err) {
      handleApiError(err, setError)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    formData,
    error,
    isLoading,
    handleChange,
    handleSubmit,
  }
}

export default useRegisterForm
