import * as nextImage from 'next/image'

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => {
    // extair a propriedade objectFit pois não é um propridade da img
    const { objectFit, ...rest } = props
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...rest} />
  }
})
