import React from 'react'
import { useParams } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CAlert,
} from '@coreui/react'
import useUpdateForm from 'src/hooks/useUpdateForm'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const UserEdit = () => {
  const { id } = useParams()
  const {
    formData,
    fetchError,
    isFetching,
    updateError,
    isUpdating,
    handleChange,
    handleSubmit,
    position,
    handleMapClick,
  } = useUpdateForm(id)

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        handleMapClick(lat, lng).then((r) => console.log(r))
      },
    })

    return position ? <Marker position={position}></Marker> : null
  }

  if (isFetching) {
    return <div>Cargando...</div>
  }

  if (fetchError) {
    return <div>Error: {fetchError}</div>
  }

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={9} lg={7} xl={6}>
          <CCard className="mx-4">
            <CCardHeader>
              <h1>Editar Usuario</h1>
            </CCardHeader>
            <CCardBody className="p-4">
              <CForm onSubmit={handleSubmit}>
                <CFormLabel>Nombre</CFormLabel>
                <CFormInput
                  name="firstName"
                  placeholder="Nombre"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mb-3"
                />
                <CFormLabel>Apellido</CFormLabel>
                <CFormInput
                  name="lastName"
                  placeholder="Apellido"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mb-3"
                />
                <CFormLabel>Email</CFormLabel>
                <CFormInput
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mb-3"
                />
                <CFormLabel>Selecciona una ubicación en el mapa</CFormLabel>
                <div style={{ height: '400px', marginBottom: '1rem' }}>
                  <MapContainer
                    center={[position.lat, position.lng]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker />
                  </MapContainer>
                </div>
                <CFormLabel>Latitud</CFormLabel>
                <CFormInput
                  name="latitud"
                  placeholder="Latitud"
                  type="number"
                  value={position.lat}
                  readOnly
                  className="mb-3"
                />
                <CFormLabel>Longitud</CFormLabel>
                <CFormInput
                  name="longitud"
                  placeholder="Longitud"
                  type="number"
                  value={position.lng}
                  readOnly
                  className="mb-3"
                />
                <CFormLabel>País</CFormLabel>
                <CFormInput
                  name="pais"
                  placeholder="País"
                  value={formData.pais}
                  readOnly
                  className="mb-3"
                />
                <CFormLabel>Estado</CFormLabel>
                <CFormInput
                  name="estado"
                  placeholder="Estado"
                  value={formData.estado}
                  readOnly
                  className="mb-3"
                />
                <CFormLabel>Ciudad</CFormLabel>
                <CFormInput
                  name="ciudad"
                  placeholder="Ciudad"
                  value={formData.ciudad}
                  readOnly
                  className="mb-3"
                />
                <CFormLabel>Código Postal</CFormLabel>
                <CFormInput
                  name="codigoPostal"
                  placeholder="Código Postal"
                  value={formData.codigoPostal}
                  readOnly
                  className="mb-3"
                />
                <CFormLabel>Fecha de Nacimiento</CFormLabel>
                <CFormInput
                  name="fechaNacimiento"
                  placeholder="Fecha de Nacimiento"
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  className="mb-3"
                />
                <CFormLabel>Número de Teléfono</CFormLabel>
                <CFormInput
                  name="numeroTelefono"
                  placeholder="Número de Teléfono"
                  value={formData.numeroTelefono}
                  onChange={handleChange}
                  className="mb-3"
                />
                <CFormLabel>Identificación</CFormLabel>
                <CFormInput
                  name="identificacion"
                  placeholder="Identificación"
                  value={formData.identificacion}
                  onChange={handleChange}
                  className="mb-3"
                />
                <CFormLabel>Imagen de Perfil</CFormLabel>
                <CFormInput
                  name="imagenPerfil"
                  type="file"
                  onChange={handleChange}
                  className="mb-3"
                />
                {updateError && (
                  <CAlert color="danger" className="mb-3">
                    {updateError.message}
                  </CAlert>
                )}
                <div className="d-grid">
                  <CButton type="submit" color="success" disabled={isUpdating}>
                    {isUpdating ? 'Actualizando...' : 'Actualizar'}
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default UserEdit
