import GameDetails, { GameDetailsProps } from '.'
import mockGameDetails from './mock'
import { renderWithTheme } from 'utils/tests/helpers'
import { screen } from '@testing-library/react'

const props = mockGameDetails

const sut = (props: GameDetailsProps) =>
  renderWithTheme(<GameDetails {...props} />)

describe('<GameDetails />', () => {
  it('should render the blocks', () => {
    sut(props)

    expect(
      screen.getByRole('heading', {
        name: /developer/i
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: /release date/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /platforms/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /publisher/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /rating/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /genres/i
      })
    ).toBeInTheDocument()
  })

  it('should render platform icons', () => {
    sut(props)

    expect(
      screen.getByRole('img', {
        name: /linux/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', {
        name: /max/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', {
        name: /windows/i
      })
    ).toBeInTheDocument()
  })

  it('should render the formated date', () => {
    sut(props)

    expect(screen.getByText('Nov 21, 2020')).toBeInTheDocument()
  })

  it('should render free rating when BR0', () => {
    sut(props)

    expect(screen.getByText(/free/i)).toBeInTheDocument()
  })

  it('should render 18+ rating when BR18', () => {
    sut({
      ...props,
      rating: 'BR18'
    })

    expect(screen.getByText(/18\+/i)).toBeInTheDocument()
  })

  it('should render a list of genres', () => {
    sut(props)

    expect(screen.getByText('Role-playing / Narrative')).toBeInTheDocument()
  })
})
