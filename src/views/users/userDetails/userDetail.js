import React from 'react'
import { useParams } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useNavigate } from 'react-router-dom'
import useUser from 'src/hooks/useUser'
import { traducirRol } from 'src/utils/traducirRol'

const UserView = () => {
  const { id } = useParams()
  const { user, error, isLoading, position } = useUser(id)
  const navigate = useNavigate()

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

  const handleEdit = () => {
    navigate(`/dashboard/user/edit/${id}`)
  }

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
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
                <span>{user.firstName}</span>
              </div>
              <div>
                <strong>Apellido: </strong>
                <span>{user.lastName}</span>
              </div>
              <div>
                <strong>Email: </strong>
                <span>{user.email}</span>
              </div>
              <div>
                <strong>Genero: </strong>
                <span>{user.genero}</span>
              </div>
              <div>
                <strong>Identificación: </strong>
                <span>{user.identificacion}</span>
              </div>
              <div>
                <strong>Rol: </strong>
                <span>{traducirRol(user.rol)}</span>
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
                <span>{user.pais}</span>
              </div>
              <div>
                <strong>Estado: </strong>
                <span>{user.estado}</span>
              </div>
              <div>
                <strong>Ciudad: </strong>
                <span>{user.ciudad}</span>
              </div>
              <div>
                <strong>Código Postal: </strong>
                <span>{user.codigoPostal}</span>
              </div>
              <div>
                <strong>Fecha de Nacimiento: </strong>
                <span>{user.fechaNacimiento}</span>
              </div>
              <div>
                <strong>Edad: </strong>
                <span>{user.age}</span>
              </div>
              <div>
                <strong>Fecha de Registro: </strong>
                <span>{user.fechaRegistro}</span>
              </div>
              <div>
                <strong>Antiguedad (dias): </strong>
                <span>{user.antiguedad}</span>
              </div>
              <div>
                <strong>Número de Teléfono: </strong>
                <span>{user.numeroTelefono}</span>
              </div>
              <div>
                <strong>Identificación: </strong>
                <span>{user.identificacion}</span>
              </div>
            </CCardBody>
            <CCardFooter>
              <CRow>
                <CCol>
                  <CButton color="primary" onClick={() => handleEdit(user.id)}>
                    Editar
                  </CButton>
                </CCol>
              </CRow>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default UserView
