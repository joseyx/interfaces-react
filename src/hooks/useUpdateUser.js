// src/hooks/useUpdateUser.js
import { useState } from 'react'
import { updateUser } from '../services/UserService'

const useUpdateUser = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateUser = async (id, userData) => {
    setIsLoading(true)
    setError(null)
    try {
      return await updateUser(id, userData)
    } catch (err) {
      if (err.response && err.response.data) {
        const apiErrors = err.response.data
        let errorMessage = ''

        if (typeof apiErrors === 'string') {
          errorMessage = apiErrors
        } else if (apiErrors.error) {
          errorMessage = apiErrors.error
        } else {
          errorMessage = Object.values(apiErrors).flat().join(' ')
        }

        setError(new Error(errorMessage))
      } else {
        setError(new Error('Error de red o del servidor'))
      }
      console.error('Error:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    error,
    isLoading,
    handleUpdateUser,
  }
}

export default useUpdateUser
