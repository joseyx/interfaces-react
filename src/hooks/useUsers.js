// src/hooks/useUsers.js
import { useState, useEffect } from 'react'
import { getAllUsers, deleteUser } from '../services/UserService'

const useUsers = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let isMounted = true
    const fetchUsers = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await getAllUsers()
        console.log('data', data)
        if (isMounted) {
          const formattedUsers = data.map((item) => {
            return {
              id: item.id,
              email: item.email,
              role: item.profile.rol,
              username: item.username,
              firstName: item.first_name,
              lastName: item.last_name,
            }
          })
          console.log('formattedUsers', formattedUsers)
          setUsers(formattedUsers)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchUsers()

    return () => {
      isMounted = false
    }
  }, [])

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id)
      window.location.reload()
    } catch (err) {
      // handleApiError(err, setError)
      console.log('Error', err)
    }
  }

  return { users, error, isLoading, handleDeleteUser }
}

export default useUsers
