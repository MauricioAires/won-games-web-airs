import 'match-media.mock'
import mockGallery from './mock'
import Gallery, { GalleryProps } from '.'
import { fireEvent, screen, render } from 'utils/test-utils'

const props = {
  items: mockGallery.slice(0, 2)
}

const sut = (props: GalleryProps) => render(<Gallery {...props} />)

describe('<Gallery />', () => {
  it('should render thumbnails as buttons', () => {
    sut(props)

    expect(
      screen.getByRole('button', {
        name: /Thumb - Gallery Image 1/i
      })
    ).toHaveAttribute('src', mockGallery[0].src)

    expect(
      screen.getByRole('button', {
        name: /Thumb - Gallery Image 2/i
      })
    ).toHaveAttribute('src', mockGallery[1].src)
  })

  it('should render open modal with selected image', async () => {
    sut(props)

    // Clicar no botão de abrir o modal com referecnai na image 2
    fireEvent.click(
      screen.getByRole('button', {
        name: /Thumb - Gallery Image 2/i
      })
    )

    const img = await screen.findByRole('img', {
      name: /Gallery Image 2/i
    })

    // esperar que a imagem da gallery esteja aberta
    expect(img.parentElement?.parentElement).toHaveClass('slick-active')
  })

  it('should render open modal', () => {
    sut(props)

    // Selecionar o modal
    const modal = screen.getByLabelText('modal')

    // Verificar se o modal esta escondido
    expect(modal.getAttribute('aria-hidden')).toBe('true')
    expect(modal).toHaveStyle({
      opacity: 0,
      pointerEvents: 'none'
    })

    // Clicar no botão de abrir o modal e verificar se e abrir
    fireEvent.click(
      screen.getByRole('button', {
        name: /Thumb - Gallery Image 1/i
      })
    )
    expect(modal.getAttribute('aria-hidden')).toBe('false')
    expect(modal).toHaveStyle({
      opacity: 1
    })
  })

  it('should render close modal when overlay or button clicked', () => {
    sut(props)

    // Selecionar o modal
    const modal = screen.getByLabelText('modal')

    // Abrir o modal
    fireEvent.click(
      screen.getByRole('button', {
        name: /Thumb - Gallery Image 1/i
      })
    )

    // Clicar no button de fechar o modal
    fireEvent.click(
      screen.getByRole('button', {
        name: /close modal/i
      })
    )

    // Verificar se está fechado
    expect(modal.getAttribute('aria-hidden')).toBe('true')
    expect(modal).toHaveStyle({
      opacity: 0
    })
  })
  it('should render close modal when ESC button is pressed', () => {
    const { container } = sut(props)

    // Selecionar o modal
    const modal = screen.getByLabelText('modal')

    // Abrir o modal
    fireEvent.click(
      screen.getByRole('button', {
        name: /Thumb - Gallery Image 1/i
      })
    )

    // Clicar no button de fechar o modal
    fireEvent.keyUp(container, {
      key: 'Escape'
    })

    // Verificar se está fechado
    expect(modal.getAttribute('aria-hidden')).toBe('true')
    expect(modal).toHaveStyle({
      opacity: 0
    })
  })
})
