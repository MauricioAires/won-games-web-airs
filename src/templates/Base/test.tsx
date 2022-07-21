import { screen, render } from 'utils/test-utils'

import Base from '.'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => {
    return {
      data: null
    }
  })
}))

jest.mock('components/Menu', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Menu"></div>
    }
  }
})

jest.mock('components/Footer', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Footer"></div>
    }
  }
})

describe('<Base />', () => {
  render(
    <Base>
      <h1>Headings</h1>
    </Base>
  )
  1
  it('should render menu, footer and children', () => {
    expect(screen.getByTestId('Mock Menu')).toBeInTheDocument()
    expect(screen.getByTestId('Mock Footer')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Headings/i })
    ).toBeInTheDocument()
  })
})
