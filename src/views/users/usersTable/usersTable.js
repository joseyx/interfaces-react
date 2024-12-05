// src/views/users/usersTable/UsersTable.js
import React from 'react'
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
} from '@coreui/react'
import useUsers from 'src/hooks/useUsers'
import { useNavigate } from 'react-router-dom'
import { firstLetterCap } from 'src/utils/firstLetterCap'

const UsersTable = () => {
  const { users, error, isLoading, handleDeleteUser } = useUsers()
  const navigate = useNavigate()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const handleProfileClick = (id) => {
    navigate(`/dashboard/user/${id}`)
  }

  const handleDelete = (id) => {
    handleDeleteUser(id).then(() => console.log('Usuario borrado'))
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Table</strong> <small>Basic example</small>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nombre Completo</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {users.map((user) => (
                  <CTableRow key={user.id}>
                    <CTableHeaderCell scope="row">{user.id}</CTableHeaderCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>{firstLetterCap(user.role)}</CTableDataCell>
                    <CTableDataCell>
                      {user.firstName} {user.lastName}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="primary"
                        variant="ghost"
                        onClick={() => handleProfileClick(user.id)}
                      >
                        Perfil
                      </CButton>
                      <CButton color="danger" variant="ghost" onClick={() => handleDelete(user.id)}>
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

export default UsersTable
