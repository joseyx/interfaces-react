// logged in user hook
// src/hooks/useLoggedInUser.js
import { useState, useEffect } from 'react'
import { getLoggedInUser } from '../services/UserService'

const useLoggedInUser = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let isMounted = true
    const fetchUser = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await getLoggedInUser()
        if (isMounted) {
          const formattedUser = {
            id: data.profile.id,
            email: data.user.email,
            rol: data.profile.rol,
            isAdmin: data.profile.is_admin,
            username: data.user.username,
            firstName: data.user.first_name,
            lastName: data.user.last_name,
            age: data.profile.age,
            antiguedad: data.profile.antiguedad,
            genero: data.profile.genero,
            pais: data.profile.pais,
            estado: data.profile.estado,
            ciudad: data.profile.ciudad,
            codigoPostal: data.profile.codigo_postal,
            latitud: data.profile.latitud,
            longitud: data.profile.longitud,
            fechaNacimiento: data.profile.fecha_nacimiento,
            fechaRegistro: data.profile.fecha_registro,
            numeroTelefono: data.profile.numero_telefono,
            identificacion: data.profile.identificacion,
            imagenPerfil: data.profile.imagen_perfil,
            imagenPerfilBig: data.profile.imagen_perfil_big,
            imagenPerfilMedium: data.profile.imagen_perfil_medium,
            imagenPerfilMini: data.profile.imagen_perfil_mini,
          }

          setUser(formattedUser)
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

    fetchUser()

    return () => {
      isMounted = false
    }
  }, [])

  return { user, error, isLoading }
}
export default useLoggedInUser
