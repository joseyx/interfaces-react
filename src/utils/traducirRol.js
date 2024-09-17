// src/utils/translateRole.js
export const traducirRol = (role) => {
  const roleMap = {
    user: 'Usuario',
    admin: 'Administrador',
  }

  const translatedRole = roleMap[role.toLowerCase()] || role
  return translatedRole.charAt(0).toUpperCase() + translatedRole.slice(1)
}
