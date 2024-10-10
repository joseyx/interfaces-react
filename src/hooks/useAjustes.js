//src/hooks/useAjustes.js
import { useState, useEffect } from 'react'
import { getAjustes, updateAjustes } from '../services/AjustesService'
import handleApiError from 'src/utils/handleApiError'

const useAjustes = () => {
  const [ajustes, setAjustes] = useState({})
  const [ajustesError, setAjustesError] = useState(null)
  const [ajustesIsLoading, setAjustesIsLoading] = useState(false)
  const [updateError, setUpdateError] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    let isMounted = true
    const fetchAjustes = async () => {
      setAjustesIsLoading(true)
      setAjustesError(null)
      try {
        const data = await getAjustes()
        if (isMounted) {
          setAjustes(data)
        }
      } catch (err) {
        if (isMounted) {
          setAjustesError(err.message)
        }
      } finally {
        if (isMounted) {
          setAjustesIsLoading(false)
        }
      }
    }

    fetchAjustes().then(() => console.log('Ajustes cargados'))

    return () => {
      isMounted = false
    }
  }, [])

  // handleUpdateAjustes
  const handleUpdateAjustes = async (ajustesData) => {
    setIsUpdating(true)
    setUpdateError(null)
    try {
      return await updateAjustes(1, ajustesData)
    } catch (err) {
      handleApiError(err, setAjustesError)
      throw err
    } finally {
      setIsUpdating(false)
    }
  }

  return { ajustes, ajustesError, ajustesIsLoading, updateError, isUpdating, handleUpdateAjustes }
}

export default useAjustes
