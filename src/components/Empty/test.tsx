import { screen, render } from 'utils/test-utils'

import Empty, { EmptyProps } from '.'

const props: EmptyProps = {
  title: 'A simple title',
  description: 'A simples description',
  hasLink: true
}

const sut = (props: EmptyProps) => render(<Empty {...props} />)

describe('<Empty />', () => {
  it('should render correctly', () => {
    const { container } = sut(props)

    expect(
      screen.getByRole('image', {
        name: /a gamer in a couch playing videogame/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /a simple title/i
      })
    ).toBeInTheDocument()
    expect(screen.getByText(/a simples description/i)).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: /go back to store/i
      })
    ).toHaveAttribute('href', '/')

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should not render link when hasLink is not passed', () => {
    sut({
      ...props,
      hasLink: false
    })

    expect(
      screen.queryByRole('link', {
        name: /go back to store/i
      })
    ).not.toBeInTheDocument()
  })
})
