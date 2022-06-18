import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import TextContent, { TextContentProps } from '.'

const props = {
  title: 'Description',
  content: `<h1>Content</h1>`
}
const sut = (props: TextContentProps) =>
  renderWithTheme(<TextContent {...props} />)

describe('<TextContent />', () => {
  it('should render the title and content', () => {
    sut(props)

    expect(
      screen.getByRole('heading', { name: /description/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /content/i })
    ).toBeInTheDocument()
  })
  it('should render without title', () => {
    sut({
      ...props,
      title: ''
    })

    expect(
      screen.queryByRole('heading', { name: /description/i })
    ).not.toBeInTheDocument()
  })

  it('should render heading color black when small screen', () => {
    sut(props)

    const wrapper = screen.getByRole('heading', {
      name: /description/i
    }).parentElement

    expect(wrapper).toHaveStyle({
      color: '#FAFAFA'
    })

    expect(wrapper).toHaveStyleRule('color', '#030517', {
      media: '(min-width: 768px)'
    })
  })
})
