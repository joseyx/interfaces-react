// src/hooks/useUpdateUser.js
import { useState } from 'react'
import { updateUser } from '../services/UserService'
import handleApiError from 'src/utils/handleApiError'
import { imageHandle } from 'src/utils/imageHandle'

const useUpdateUser = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateUser = async (id, userData) => {
    setIsLoading(true)
    setError(null)
    try {
      console.log('userData', userData)
      userData.profile.imagen_perfil = await imageHandle(userData.profile.imagen_perfil)
      return await updateUser(id, userData)
    } catch (err) {
      console.log('Error al actualizar el usuario', err)
      handleApiError(err, setError)
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
