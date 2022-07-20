import { screen, render } from 'utils/test-utils'

import Button from '.'

import { AddShoppingCart } from '@styled-icons/material-outlined/AddShoppingCart'

describe('<Button />', () => {
  it('should render the medium size by default', () => {
    const { container } = render(<Button>Buy now</Button>)

    expect(
      screen.getByRole('button', {
        name: /Buy now/i
      })
    ).toHaveStyle({
      height: '4rem',
      padding: '0.8rem 3.2rem',
      'font-size': '1.4rem'
    })
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render the small size', () => {
    render(<Button size="small">Buy now</Button>)

    expect(
      screen.getByRole('button', {
        name: /Buy now/i
      })
    ).toHaveStyle({
      height: '3rem',
      'font-size': '1.2rem'
    })
  })

  it('should render the large size', () => {
    render(<Button size="large">Buy now</Button>)

    expect(
      screen.getByRole('button', {
        name: /Buy now/i
      })
    ).toHaveStyle({
      height: '5rem',
      'font-size': '1.6rem',
      padding: '0.8rem 4.8rem'
    })
  })

  it('should render a fullWidth version', () => {
    render(<Button fullWidth>Buy now</Button>)

    expect(
      screen.getByRole('button', {
        name: /Buy now/i
      })
    ).toHaveStyle({
      width: '100%'
    })
  })

  it('should render an icon version', () => {
    render(
      <Button icon={<AddShoppingCart data-testid="icon" />}>Buy now</Button>
    )

    expect(screen.getByText(/Buy now/i)).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('should render an minimal version', () => {
    render(
      <Button icon={<AddShoppingCart data-testid="icon" />} minimal>
        Buy now
      </Button>
    )

    expect(
      screen.getByRole('button', {
        name: /buy now/i
      })
    ).toHaveStyle({
      background: 'none',
      color: '#F231A5'
    })

    expect(
      screen.getByRole('button', {
        name: /buy now/i
      })
    ).toHaveStyleRule('background', 'none', {
      modifier: ':hover'
    })
  })

  it('should render Button as a link', () => {
    render(
      <Button as="a" href="/link">
        Buy Now
      </Button>
    )

    // debug(container)

    expect(
      screen.getByRole('link', {
        name: /Buy Now/i
      })
    ).toHaveAttribute('href', '/link')
  })

  it('should render a disanled button', () => {
    render(<Button disabled>Buy Now</Button>)

    expect(
      screen.getByRole('button', {
        name: /buy now/i
      })
    ).toHaveStyleRule('cursor', 'not-allowed', {
      modifier: ':disabled'
    })
  })
})
