import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import userEvent from '@testing-library/user-event'

import Dropdown, { DropdownProps } from '.'

const props: DropdownProps = {
  title: <h1 aria-label="toggle dropdown">Click here</h1>,
  children: <span>content</span>
}
const sut = (props: DropdownProps) => renderWithTheme(<Dropdown {...props} />)

describe('<Dropdown />', () => {
  it('should render title', () => {
    sut(props)

    expect(screen.getByLabelText(/toggle dropdown/)).toBeInTheDocument()
  })

  it('should handle open/close dropdown', async () => {
    sut(props)

    const content = screen.getByText(/content/).parentElement!

    expect(content).toHaveStyle({
      opacity: 0
    })
    expect(content.getAttribute('aria-hidden')).toBe('true')

    await userEvent.click(screen.getByLabelText(/toggle dropdown/i))

    expect(content).toHaveStyle({
      opacity: 1
    })
    expect(content.getAttribute('aria-hidden')).toBe('false')
  })

  it('should handle open/close dropdown when clicking on overlay', async () => {
    sut(props)

    const content = screen.getByText(/content/).parentElement!
    const overlay = content.nextElementSibling!

    await userEvent.click(screen.getByLabelText(/toggle dropdown/i))

    expect(overlay).toHaveStyle({
      opacity: 1
    })
    expect(overlay.getAttribute('aria-hidden')).toBe('false')

    await userEvent.click(overlay!)

    expect(overlay).toHaveStyle({
      opacity: 0
    })
    expect(overlay.getAttribute('aria-hidden')).toBe('true')
  })
})
