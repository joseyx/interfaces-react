import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCarousel,
  CCarouselItem,
  CCol,
  CContainer,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
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

  const [visible, setVisible] = useState(false)

  const scaleFactor = 0.2

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
    <>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
        scrollable={true}
      >
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel">Tamaños alternativos</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="d-flex flex-column align-items-center">
            {/* Imagen grande */}
            <div className="mb-3">
              <img
                src={user.imagenPerfilBig}
                alt="Imagen grande"
                style={{
                  width: `${1920 * scaleFactor}px`,
                  height: `${1080 * scaleFactor}px`,
                  border: '1px solid #ddd',
                }}
              />
              <p className="text-center mt-2">1920x1080 (Grande)</p>
            </div>

            {/* Imagen mediana */}
            <div className="mb-3">
              <img
                src={user.imagenPerfilMedium}
                alt="Imagen mediana"
                style={{
                  width: `${1280 * scaleFactor}px`,
                  height: `${720 * scaleFactor}px`,
                  border: '1px solid #ddd',
                }}
              />
              <p className="text-center mt-2">1280x720 (Mediana)</p>
            </div>

            {/* Imagen mini */}
            <div>
              <img
                src={user.imagenPerfilMini}
                alt="Imagen pequeña"
                style={{
                  width: `${640 * scaleFactor}px`,
                  height: `${360 * scaleFactor}px`,
                  border: '1px solid #ddd',
                }}
              />
              <p className="text-center mt-2">640x360 (Pequeña)</p>
            </div>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardHeader>
                <h1>Ver Usuario</h1>
              </CCardHeader>
              <CCardBody className="p-4">
                <div className={'mb-1'}>
                  <strong>Nombre: </strong>
                  <span>{user.firstName}</span>
                </div>
                <div className={'mb-1'}>
                  <strong>Apellido: </strong>
                  <span>{user.lastName}</span>
                </div>
                <div className={'mb-1'}>
                  <strong>Email: </strong>
                  <span>{user.email}</span>
                </div>
                {/*<div className={'mb-1'}>*/}
                {/*  <strong>Username: </strong>*/}
                {/*  <span>{user.username}</span>*/}
                {/*</div>*/}
                <div className={'mb-1'}>
                  <strong>Genero: </strong>
                  <span>{user.genero}</span>
                </div>
                <div className={'mb-1'}>
                  <strong>Rol: </strong>
                  <span>{traducirRol(user.rol)}</span>
                </div>
                {/* imagen de perfil */}
                <div className={'mb-1'}>
                  <strong>Imagen de Perfil: </strong>
                  <img
                    src={user.imagenPerfil}
                    alt="imagen de perfil"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                {/* Boton para ver otros tamaños */}
                <div className={'mb-1'}>
                  <CButton color="info" variant="ghost" onClick={() => setVisible(true)}>
                    Ver otros tamaños
                  </CButton>
                </div>
                <div className={'mb-1'}>
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
                <div className={'mb-1'}>
                  <strong>Latitud: </strong>
                  <span>{position.lat}</span>
                </div>
                <div className={'mb-1'}>
                  <strong>Longitud: </strong>
                  <span>{position.lng}</span>
                </div>
                <div className={'mb-1'}>
                  <strong>País: </strong>
                  <span>{user.pais}</span>
                </div>
                <div className={'mb-1'}>
                  <strong>Estado: </strong>
                  <span>{user.estado}</span>
                </div>
                <div className={'mb-1'}>
                  <strong>Ciudad: </strong>
                  <span>{user.ciudad}</span>
                </div>
                <div className={'mb-1'}>
                  <strong>Código Postal: </strong>
                  <span>{user.codigoPostal}</span>
                </div>
                <div className={'mb-1'}>
                  <strong>Fecha de Nacimiento: </strong>
                  <span>{user.fechaNacimiento}</span>
                </div>
                <div className={'mb-1'}>
                  <strong>Edad: </strong>
                  <span>{user.age} años</span>
                </div>
                <div className={'mb-1'}>
                  <strong>Fecha de Registro: </strong>
                  <span>{user.fechaRegistro}</span>
                </div>
                <div className={'mb-1'}>
                  <strong>Antiguedad (dias): </strong>
                  <span>{user.antiguedad}</span>
                </div>
                <div className={'mb-1'}>
                  <strong>Número de Teléfono: </strong>
                  <span>{user.numeroTelefono}</span>
                </div>
                <div className={'mb-1'}>
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
    </>
  )
}

export default UserView
