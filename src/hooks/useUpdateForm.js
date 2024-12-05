// src/hooks/useUpdateForm.js
import { useState, useEffect } from 'react'
import useUser from 'src/hooks/useUser'
import useUpdateUser from 'src/hooks/useUpdateUser'
import { fetchLocationData } from 'src/services/geocodingService'
import { useNavigate } from 'react-router-dom'

const useUpdateForm = (id) => {
  const navigate = useNavigate()
  const { user, error: fetchError, isLoading: isFetching } = useUser(id)
  const { handleUpdateUser, error: updateError, isLoading: isUpdating } = useUpdateUser()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    // username: '',
    rol: 'user',
    age: '',
    genero: '',
    pais: '',
    estado: '',
    ciudad: '',
    codigoPostal: '',
    latitud: 0,
    longitud: 0,
    fechaNacimiento: null,
    numeroTelefono: '',
    identificacion: '',
    imagenPerfil: null,
  })
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 })
  const [locationInfo, setLocationInfo] = useState({
    city: '',
    state: '',
    country: '',
    road: '',
    postcode: '',
  })

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        // username: user.username || '',
        rol: user.rol || 'user',
        age: user.age || '',
        genero: user.genero || '',
        pais: user.pais || '',
        estado: user.estado || '',
        ciudad: user.ciudad || '',
        codigoPostal: user.codigoPostal || '',
        latitud: user.latitud || 0,
        longitud: user.longitud || 0,
        fechaNacimiento: user.fechaNacimiento || null,
        numeroTelefono: user.numeroTelefono || '',
        identificacion: user.identificacion || '',
        imagenPerfil: user.imagenPerfil || null,
      })
      setPosition({
        lat: user.latitud || 51.505,
        lng: user.longitud || -0.09,
      })
      setLocationInfo({
        city: user.ciudad || '',
        state: user.estado || '',
        country: user.pais || '',
        road: '',
        postcode: user.codigoPostal || '',
      })
    }
  }, [user])

  useEffect(() => {
    if (position.lat !== formData.latitud || position.lng !== formData.longitud) {
      setFormData((prevData) => ({
        ...prevData,
        latitud: position.lat,
        longitud: position.lng,
      }))
    }
  }, [position])

  useEffect(() => {
    if (
      locationInfo.city !== formData.ciudad ||
      locationInfo.state !== formData.estado ||
      locationInfo.country !== formData.pais ||
      locationInfo.postcode !== formData.codigoPostal
    ) {
      setFormData((prevData) => ({
        ...prevData,
        ciudad: locationInfo.city,
        estado: locationInfo.state,
        pais: locationInfo.country,
        codigoPostal: locationInfo.postcode,
      }))
    }
  }, [locationInfo])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'imagenPerfil') {
      setFormData((prevData) => ({ ...prevData, [name]: files.length > 0 ? files[0] : null }))
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }))
    }
  }

  const handleMapClick = async (lat, lng) => {
    setPosition({ lat, lng })
    const data = await fetchLocationData(lat, lng)
    setLocationInfo(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formattedData = {
      user: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        username: formData.username,
      },
      profile: {
        rol: formData.rol,
        genero: formData.genero,
        pais: formData.pais,
        estado: formData.estado,
        ciudad: formData.ciudad,
        codigo_postal: formData.codigoPostal,
        latitud: formData.latitud,
        longitud: formData.longitud,
        fecha_nacimiento: formData.fechaNacimiento || null,
        numero_telefono: formData.numeroTelefono,
        identificacion: formData.identificacion,
        imagen_perfil: formData.imagenPerfil,
      },
    }
    try {
      await handleUpdateUser(id, formattedData)
      // navigate to user details
      navigate(`/dashboard/user/${id}`)
    } catch (err) {
      console.error('Error al actualizar el usuario:', err)
    }
  }

  return {
    formData,
    fetchError,
    isFetching,
    updateError,
    isUpdating,
    handleChange,
    handleSubmit,
    position,
    handleMapClick,
  }
}

export default useUpdateForm
