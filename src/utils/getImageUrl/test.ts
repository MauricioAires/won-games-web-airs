import { getImageUrl } from '.'

describe('$getImageUrl', () => {
  it('should return url using process.env.NEXT_PUBLIC_IMAGE_HOST', () => {
    /// sobreescever process.emv
    process.env = {
      ...process.env,
      NEXT_PUBLIC_IMAGE_HOST: 'http://localhost:1337/'
    }

    expect(getImageUrl('image.png')).toStrictEqual(
      'http://localhost:1337/image.png'
    )
  })

  it('should return url without process.env', () => {
    /// sobreescever process.emv
    process.env = {
      ...process.env,
      NEXT_PUBLIC_IMAGE_HOST: ''
    }

    expect(getImageUrl('https://firebase/image.png')).toStrictEqual(
      'https://firebase/image.png'
    )
  })

  it('should return null when url image is undefined', () => {
    expect(getImageUrl(undefined)).toBeNull()
  })
})
