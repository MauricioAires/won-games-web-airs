import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Menu from '.'

describe('<Menu />', () => {
  it('should render the menu', () => {
    renderWithTheme(<Menu />)

    expect(screen.getByLabelText(/Open Menu/i)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /Won Games/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/Search/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Open Shopping Cart/i)).toBeInTheDocument()
  })

  it('should handle the open/close mobile menu', () => {
    renderWithTheme(<Menu />)

    // Selecionar o MenuFull
    const fullMenuElement = screen.getByRole('navigation', { hidden: true })

    // Verificar se o menu esta escondido
    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('true')
    expect(fullMenuElement).toHaveStyle({
      opacity: 0
    })

    // Clicar no botão de abrir o menu e verificar se e abrir
    fireEvent.click(screen.getByLabelText(/Open Menu/i))
    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('false')
    expect(fullMenuElement).toHaveStyle({
      opacity: 1
    })

    // Clicar no botão de fechar o menu e verificar se ele fechou
    fireEvent.click(screen.getByLabelText(/Close Menu/i))
    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('true')
    expect(fullMenuElement).toHaveStyle({
      opacity: 0
    })
  })

  it('should show register box when logged out', () => {
    renderWithTheme(<Menu />)

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument()
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument()
    // espero que não esteja no documento
    expect(screen.queryByText(/My account/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Wishlist/i)).not.toBeInTheDocument()
  })

  it('should show wishlist and account when logged in', () => {
    renderWithTheme(<Menu userName="Will" />)

    expect(screen.getByText(/My account/i)).toBeInTheDocument()
    expect(screen.getByText(/Wishlist/i)).toBeInTheDocument()
    // Espero que não esteja no  documento
    expect(screen.queryByText(/Login in now/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Sign up/i)).not.toBeInTheDocument()
  })
})
