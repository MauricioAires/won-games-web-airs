export const getImageUrl = (url: string | undefined) => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_HOST

  if (baseUrl && url) {
    return `${baseUrl}${url}`
  }

  if (url) {
    return url
  }

  return null
}
