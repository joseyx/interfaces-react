// src/hooks/useUsers.js
import { useState, useEffect } from 'react'
import { getAllUsers } from '../services/UserService'

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
        if (isMounted) {
          const formattedUsers = data.map((item) => ({
            id: item.profile.user,
            email: item.user.email,
            role: item.profile.rol,
            username: item.user.username,
            firstName: item.user.first_name,
            lastName: item.user.last_name,
          }))
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

  return { users, error, isLoading }
}

export default useUsers
