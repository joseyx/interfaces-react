//src/hooks/useArchivos.js
import { useState, useEffect } from 'react'
import { createArchivo, deleteArchivo, getArchivos } from 'src/services/ArchivosService'
import handleApiError from 'src/utils/handleApiError'

const useArchivos = () => {
  const [archivos, setArchivos] = useState([])
  const [imagenes, setImagenes] = useState([])
  const [documentos, setDocumentos] = useState([])
  const [videos, setVideos] = useState([])
  const [audios, setAudios] = useState([])
  const [subtitulos, setSubtitulos] = useState([])
  const [archivosError, setArchivosError] = useState(null)
  const [archivosIsLoading, setArchivosIsLoading] = useState(false)

  const formatArchivos = (archivos) => {
    return archivos.map((archivo) => ({
      id: archivo.id,
      name: archivo.name,
      tipo_de_archivo: archivo.tipo_de_archivo,
      archivo: archivo.archivo,
      peso: archivo.peso || null,
      ancho: archivo.ancho || null,
      alto: archivo.alto || null,
      duracion: archivo.duracion || null,
      formato: archivo.formato || null,
    }))
  }

  const fetchArchivos = async () => {
    setArchivosIsLoading(true)
    setArchivosError(null)
    try {
      const data = await getArchivos()
      setArchivos(formatArchivos(data))
      setImagenes(data.filter((archivo) => archivo.tipo_de_archivo === 'imagen'))
      setDocumentos(data.filter((archivo) => archivo.tipo_de_archivo === 'wysiwyg'))
      setVideos(data.filter((archivo) => archivo.tipo_de_archivo === 'video'))
      setAudios(data.filter((archivo) => archivo.tipo_de_archivo === 'audio'))
      setSubtitulos(data.filter((archivo) => archivo.tipo_de_archivo === 'subtitulo'))
    } catch (err) {
      setArchivosError(err.message)
    } finally {
      setArchivosIsLoading(false)
    }
  }

  useEffect(() => {
    fetchArchivos().then(() => console.log('Archivos cargados'))
  }, [])

  const handleDeleteArchivo = async (id) => {
    try {
      await deleteArchivo(id)
      await fetchArchivos() // Fetch the updated list of archivos
    } catch (err) {
      handleApiError(err, setArchivosError)
    }
  }

  const handleCreateArchivo = async (archivoData) => {
    try {
      await createArchivo(archivoData)
      await fetchArchivos() // Fetch the updated list of archivos
    } catch (err) {
      handleApiError(err, setArchivosError)
    }
  }

  return {
    archivos,
    archivosError,
    archivosIsLoading,
    handleDeleteArchivo,
    handleCreateArchivo,
    imagenes,
    documentos,
    videos,
    audios,
    subtitulos,
  }
}

export default useArchivos
