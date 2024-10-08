import React from 'react'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import useUpdateForm from 'src/hooks/useUpdateForm'

const UserView = () => {
  const { id } = useParams()
  const { formData, fetchError, isFetching, position } = useUpdateForm(id)

  // eslint-disable-next-line react/prop-types
  const LocationMarker = ({ position }) => {
    const map = useMap()

    React.useEffect(() => {
      if (position) {
        map.setView(position, map.getZoom())
      }
    }, [position, map])

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
              <h1>Ver Usuario</h1>
            </CCardHeader>
            <CCardBody className="p-4">
              <div>
                <strong>Nombre: </strong>
                <span>{formData.firstName}</span>
              </div>
              <div>
                <strong>Apellido: </strong>
                <span>{formData.lastName}</span>
              </div>
              <div>
                <strong>Email: </strong>
                <span>{formData.email}</span>
              </div>
              <div>
                <strong>Ubicación: </strong>
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
                    <LocationMarker position={position} />
                  </MapContainer>
                </div>
              </div>
              <div>
                <strong>Latitud: </strong>
                <span>{position.lat}</span>
              </div>
              <div>
                <strong>Longitud: </strong>
                <span>{position.lng}</span>
              </div>
              <div>
                <strong>País: </strong>
                <span>{formData.pais}</span>
              </div>
              <div>
                <strong>Estado: </strong>
                <span>{formData.estado}</span>
              </div>
              <div>
                <strong>Ciudad: </strong>
                <span>{formData.ciudad}</span>
              </div>
              <div>
                <strong>Código Postal: </strong>
                <span>{formData.codigoPostal}</span>
              </div>
              <div>
                <strong>Fecha de Nacimiento: </strong>
                <span>{formData.fechaNacimiento}</span>
              </div>
              <div>
                <strong>Número de Teléfono: </strong>
                <span>{formData.numeroTelefono}</span>
              </div>
              <div>
                <strong>Identificación: </strong>
                <span>{formData.identificacion}</span>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default UserView
