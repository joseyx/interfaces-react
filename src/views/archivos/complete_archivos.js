// src/views/archivos/complete_archivos.js
import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CTableHead,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CForm,
  CFormLabel,
  CFormSelect,
  CFormInput,
} from '@coreui/react'

import useArchivos from 'src/hooks/useArchivos'
import { useNavigate } from 'react-router-dom'

const ArchivosTable = () => {
  const [visible, setVisible] = useState(false)
  const [formData, setFormData] = useState({
    tipo_de_archivo: '',
    archivo: null,
  })
  const {
    videos,
    imagenes,
    documentos,
    audios,
    subtitulos,
    archivosError,
    archivosIsLoading,
    handleDeleteArchivo,
    handleCreateArchivo,
  } = useArchivos()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    handleCreateArchivo(formData).then(() => console.log('Archivo creado'))
    console.log(formData)
    setVisible(false)
  }

  if (archivosIsLoading) {
    return <div>Loading...</div>
  }

  if (archivosError) {
    return <div>Error: {archivosError}</div>
  }

  const handleDelete = (id) => {
    handleDeleteArchivo(id).then(() => console.log('Archivo eliminado'))
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CButton color="primary" onClick={() => setVisible(!visible)}>
            Agregar Archivo
          </CButton>
        </CCard>

        <CModal
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="LiveDemoExampleLabel"
        >
          <CForm onSubmit={handleSubmit}>
            <CModalHeader>
              <CModalTitle id="LiveDemoExampleLabel">Guardar Archivo</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormLabel>Tipo de Archivo</CFormLabel>
              <CFormSelect
                name="tipo_de_archivo"
                aria-label="Seleccione el tipo de archivo"
                options={[
                  'Seleccione el tipo de archivo',
                  { label: 'Wysiwyg', value: 'wysiwyg' },
                  { label: 'Audio', value: 'audio' },
                  { label: 'Video', value: 'video' },
                  { label: 'Imagen', value: 'imagen' },
                  { label: 'Subtitulo', value: 'subtitulo' },
                ]}
                onChange={handleChange}
              />
              <div className="mb-3 pt-3">
                <CFormInput
                  name="archivo"
                  type="file"
                  id="formFile"
                  label="Seleccione el archivo"
                  onChange={handleChange}
                />
              </div>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton type="submit" color="primary">
                Save changes
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>

        {/*Tabla videos*/}
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Archivos de video</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Formato</CTableHeaderCell>
                  <CTableDataCell scope="col">Duracion (segundos)</CTableDataCell>
                  <CTableDataCell scope="col">Enlace</CTableDataCell>
                  <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {videos.map((archivo) => (
                  <CTableRow key={archivo.id}>
                    <CTableHeaderCell scope="row">{archivo.id}</CTableHeaderCell>
                    <CTableDataCell>{archivo.name}</CTableDataCell>
                    <CTableDataCell>{archivo.formato}</CTableDataCell>
                    <CTableDataCell>{archivo.duracion}</CTableDataCell>
                    <CTableDataCell>
                      <a href={archivo.archivo} target="_blank" rel="noreferrer">
                        Ver
                      </a>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="danger" onClick={() => handleDelete(archivo.id)}>
                        Eliminar
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>

        {/*Tabla imagenes*/}
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Imagenes</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ancho</CTableHeaderCell>
                  <CTableDataCell scope="col">Alto</CTableDataCell>
                  <CTableDataCell scope="col">Peso</CTableDataCell>
                  <CTableDataCell scope="col">Enlace</CTableDataCell>
                  <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {imagenes.map((archivo) => (
                  <CTableRow key={archivo.id}>
                    <CTableHeaderCell scope="row">{archivo.id}</CTableHeaderCell>
                    <CTableDataCell>{archivo.name}</CTableDataCell>
                    <CTableDataCell>{archivo.ancho}</CTableDataCell>
                    <CTableDataCell>{archivo.alto}</CTableDataCell>
                    <CTableDataCell>{archivo.peso}</CTableDataCell>
                    <CTableDataCell>
                      <a href={archivo.archivo} target="_blank" rel="noreferrer">
                        Ver
                      </a>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="danger" onClick={() => handleDelete(archivo.id)}>
                        Eliminar
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>

        {/*Tabla documentos*/}
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Documentos</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Peso</CTableHeaderCell>
                  <CTableDataCell scope="col">Enlace</CTableDataCell>
                  <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {documentos.map((archivo) => (
                  <CTableRow key={archivo.id}>
                    <CTableHeaderCell scope="row">{archivo.id}</CTableHeaderCell>
                    <CTableDataCell>{archivo.name}</CTableDataCell>
                    <CTableDataCell>{archivo.peso}</CTableDataCell>
                    <CTableDataCell>
                      <a href={archivo.archivo} target="_blank" rel="noreferrer">
                        Ver
                      </a>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="danger" onClick={() => handleDelete(archivo.id)}>
                        Eliminar
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>

        {/*Tabla audios*/}
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Audios</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Duracion</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Formato</CTableHeaderCell>
                  <CTableDataCell scope="col">Peso</CTableDataCell>
                  <CTableDataCell scope="col">Enlace</CTableDataCell>
                  <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {audios.map((archivo) => (
                  <CTableRow key={archivo.id}>
                    <CTableHeaderCell scope="row">{archivo.id}</CTableHeaderCell>
                    <CTableDataCell>{archivo.name}</CTableDataCell>
                    <CTableDataCell>{archivo.duracion}</CTableDataCell>
                    <CTableDataCell>{archivo.formato}</CTableDataCell>
                    <CTableDataCell>{archivo.peso}</CTableDataCell>
                    <CTableDataCell>
                      <a href={archivo.archivo} target="_blank" rel="noreferrer">
                        Ver
                      </a>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="danger" onClick={() => handleDelete(archivo.id)}>
                        Eliminar
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>

        {/*Tabla subtitulos*/}
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Subtitulos</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Formato</CTableHeaderCell>
                  <CTableDataCell scope="col">Enlace</CTableDataCell>
                  <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {subtitulos.map((archivo) => (
                  <CTableRow key={archivo.id}>
                    <CTableHeaderCell scope="row">{archivo.id}</CTableHeaderCell>
                    <CTableDataCell>{archivo.name}</CTableDataCell>
                    <CTableDataCell>{archivo.formato}</CTableDataCell>
                    <CTableDataCell>
                      <a href={archivo.archivo} target="_blank" rel="noreferrer">
                        Ver
                      </a>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="danger" onClick={() => handleDelete(archivo.id)}>
                        Eliminar
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ArchivosTable
