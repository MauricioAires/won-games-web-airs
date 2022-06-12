import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ShoppingCartIcon } from 'styles/icons'

import { renderWithTheme } from 'utils/tests/helpers'

import TextField from '.'

describe('<TextField />', () => {
  it('Renders with Label', () => {
    renderWithTheme(<TextField label="Label" labelFor="Field" id="Field" />)

    expect(screen.getByLabelText('Label')).toBeInTheDocument()
  })

  it('Renders without Label', () => {
    renderWithTheme(<TextField />)

    expect(screen.queryByLabelText('Label')).not.toBeInTheDocument()
  })

  it('Renders with placeholder', () => {
    renderWithTheme(<TextField placeholder="hey you" />)

    expect(screen.getByPlaceholderText('hey you')).toBeInTheDocument()
  })

  it('Changes its value when typing', async () => {
    const onInput = jest.fn()
    renderWithTheme(
      <TextField
        onInput={onInput}
        label="TextField"
        labelFor="TextField"
        id="TextField"
      />
    )

    const input = screen.getByRole('textbox')
    const text = 'This is my new text'
    userEvent.type(input, text)

    await waitFor(() => {
      expect(input).toHaveValue(text)
      expect(onInput).toHaveBeenCalledTimes(text.length)
    })
    expect(onInput).toHaveBeenCalledWith(text)
  })

  it.skip('Is accessible by tab', () => {
    renderWithTheme(
      <TextField label="TextField" labelFor="TextField" id="TextField" />
    )

    const input = screen.getByLabelText('TextField')
    expect(document.body).toHaveFocus()

    userEvent.tab()
    expect(input).toHaveFocus()
  })

  it('should render with Icon', () => {
    renderWithTheme(
      <TextField icon={<ShoppingCartIcon data-testid="icon" />} />
    )

    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('should render with icon on the rigth side', () => {
    renderWithTheme(
      <TextField
        icon={<ShoppingCartIcon data-testid="icon" />}
        iconPosition="rigth"
      />
    )

    expect(screen.getByTestId('icon').parentElement).toHaveStyle({
      order: 1
    })
  })

  it('does not changes its value when disavled', async () => {
    const onInput = jest.fn()

    renderWithTheme(
      <TextField
        onInput={onInput}
        label="TextField"
        labelFor="textField"
        id="TextField"
        disabled
      />
    )

    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()

    const text = 'This is my new text'

    userEvent.type(input, text)

    await waitFor(() => {
      expect(input).not.toHaveValue(text)
    })

    expect(onInput).not.toBeCalled()
  })

  it('should render with error', () => {
    const { container } = renderWithTheme(
      <TextField
        icon={<ShoppingCartIcon data-testid="icon" />}
        label="TextField"
        labelFor="TextField"
        error="Erro message"
      />
    )

    expect(screen.getByText(/erro message/i)).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })
})
