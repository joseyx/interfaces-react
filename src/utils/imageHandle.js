// function that receives an image or an image url, if input is an url download the image and return it to send it in a form data
export const imageHandle = async (image) => {
  if (typeof image === 'string') {
    const response = await fetch(image)
    const blob = await response.blob()
    const filename = image.split('/').pop()
    const file = new File([blob], filename, { type: blob.type })
    console.log('file', file)
    return file
  }
  return image
}
