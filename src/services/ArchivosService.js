// src/services/ArchivosService.js
import api from '../api/axiosInstance'

// Función para obtener los archivos
export const getArchivos = async () => {
  try {
    const response = await api.get('/archivos/')
    return response.data
  } catch (error) {
    throw new Error('Error al obtener los archivos')
  }
}

// Función para obtener un archivo por ID
export const getArchivo = async (id) => {
  try {
    const response = await api.get(`/archivos/${id}/`)
    return response.data
  } catch (error) {
    throw new Error('Error al obtener el archivo')
  }
}

// Función para crear archivos
export const createArchivo = async (archivoData) => {
  try {
    const response = await api.post('/archivos/', archivoData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    throw new Error('Error al crear el archivo')
  }
}

// Función para eliminar archivos
export const deleteArchivo = async (id) => {
  try {
    const response = await api.delete(`/archivos/${id}/`)
    return response.data
  } catch (error) {
    throw new Error('Error al eliminar el archivo')
  }
}

// Función para obtener los archivos de tipo imagen
export const getImagenes = async () => {
  try {
    const response = await api.get('/archivos/?tipo=imagen')
    return response.data
  } catch (error) {
    throw new Error('Error al obtener las imagenes')
  }
}

// Función para obtener los archivos de tipo video
export const getVideos = async () => {
  try {
    const response = await api.get('/archivos/?tipo=video')
    return response.data
  } catch (error) {
    throw new Error('Error al obtener los videos')
  }
}

// Función para obtener los archivos de tipo audio
export const getAudios = async () => {
  try {
    const response = await api.get('/archivos/?tipo=audio')
    return response.data
  } catch (error) {
    throw new Error('Error al obtener los audios')
  }
}

// Función para obtener los archivos de tipo documento
export const getDocumentos = async () => {
  try {
    const response = await api.get('/archivos/?tipo=documento')
    return response.data
  } catch (error) {
    throw new Error('Error al obtener los documentos')
  }
}

// Función para obtener los archivos de tipo subtítulo
export const getSubtitulos = async () => {
  try {
    const response = await api.get('/archivos/?tipo=subtitulo')
    return response.data

  } catch (error) {
    throw new Error('Error al obtener los subtitulos')
  }
}
