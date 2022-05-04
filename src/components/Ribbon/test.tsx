import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Ribbon, { RibbonProps } from '.'

const byText = /Best Seller/i

const props: RibbonProps = {
  children: 'Best Seller'
}

describe('<Ribbon />', () => {
  it('should render the text correctly', () => {
    renderWithTheme(<Ribbon {...props} />)

    expect(screen.getByText(byText)).toBeInTheDocument()
  })
  it('should render with the primary color', () => {
    renderWithTheme(<Ribbon {...props} />)

    expect(screen.getByText(byText)).toHaveStyle({
      backgroundColor: '#F231A5'
    })
  })
  it('should render with the secondary color', () => {
    renderWithTheme(<Ribbon {...props} color="secondary" />)

    expect(screen.getByText(byText)).toHaveStyle({
      backgroundColor: '#3CD3C1'
    })
  })

  it('should render with the normal size as default', () => {
    renderWithTheme(<Ribbon {...props} />)

    expect(screen.getByText(byText)).toHaveStyle({
      height: '3.6rem',
      fontSize: '1.4rem'
    })
  })

  it('should render with the small size', () => {
    renderWithTheme(<Ribbon {...props} size="small" />)

    expect(screen.getByText(byText)).toHaveStyle({
      height: '2.6rem',
      fontSize: '1.2rem'
    })
  })
})
