// src/hooks/useUser.js
import { useState, useEffect } from 'react'
import { getUserById } from '../services/UserService'

const useUser = (id) => {
  const [user, setUser] = useState({
    id: '',
    email: '',
    rol: '',
    username: '',
    firstName: '',
    lastName: '',
    age: '',
    antiguedad: '',
    genero: '',
    pais: '',
    estado: '',
    ciudad: '',
    codigoPostal: '',
    latitud: 0,
    longitud: 0,
    fechaNacimiento: null,
    fechaRegistro: null,
    numeroTelefono: '',
    identificacion: '',
    imagenPerfil: null,
    imagenPerfilBig: null,
    imagenPerfilMedium: null,
    imagenPerfilMini: null,
  })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 })

  useEffect(() => {
    let isMounted = true
    const fetchUser = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await getUserById(id)
        if (isMounted) {
          const formattedUser = {
            id: data.profile.id,
            email: data.user.email,
            rol: data.profile.rol,
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
          setPosition({
            lat: data.profile.latitud || 51.505,
            lng: data.profile.longitud || -0.09,
          })
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
  }, [id])

  return { user, error, isLoading, position }
}

export default useUser
