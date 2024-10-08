// src/hooks/useLoginForm.js
import { useState } from 'react'
import { login } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'
import handleApiError from 'src/utils/handleApiError'

const useLoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Hook para redirigir a otra página
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const data = await login(formData)
      // Redirect or perform any other action after successful login
      if (data) {
        console.log('Login successful', data)
        if (data.rol === 'admin') {
          window.location.href = '/dashboard'
        } else {
          window.location.href = '/'
        }
      }
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

export default useLoginForm
