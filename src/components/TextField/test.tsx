import { screen, waitFor, render } from 'utils/test-utils'
import userEvent from '@testing-library/user-event'
import { ShoppingCartIcon } from 'styles/icons'

import TextField from '.'

describe('<TextField />', () => {
  it('Renders with Label', () => {
    render(<TextField label="Label" name="Label" />)

    expect(screen.getByLabelText('Label')).toBeInTheDocument()
  })

  it('Renders without Label', () => {
    render(<TextField />)

    expect(screen.queryByLabelText('Label')).not.toBeInTheDocument()
  })

  it('Renders with placeholder', () => {
    render(<TextField placeholder="hey you" />)

    expect(screen.getByPlaceholderText('hey you')).toBeInTheDocument()
  })

  it('Changes its value when typing', async () => {
    const onInputChange = jest.fn()
    render(
      <TextField
        onInputChange={onInputChange}
        label="TextField"
        name="TextField"
      />
    )

    const input = screen.getByRole('textbox')
    const text = 'This is my new text'

    await userEvent.type(input, text)

    await waitFor(() => {
      expect(input).toHaveValue(text)
      expect(onInputChange).toHaveBeenCalledTimes(text.length)
    })
    expect(onInputChange).toHaveBeenCalledWith(text)
  })

  it('Is accessible by tab', async () => {
    render(<TextField label="TextField" name="TextField" />)

    const input = screen.getByLabelText('TextField')
    expect(document.body).toHaveFocus()

    await userEvent.tab()

    await waitFor(() => {
      expect(input).toHaveFocus()
    })
  })

  it('should render with Icon', () => {
    render(<TextField icon={<ShoppingCartIcon data-testid="icon" />} />)

    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('should render with icon on the rigth side', () => {
    render(
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
    const onInputChange = jest.fn()

    render(
      <TextField
        onInputChange={onInputChange}
        label="TextField"
        name="TextField"
        disabled
      />
    )

    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()

    const text = 'This is my new text'

    await userEvent.type(input, text)

    await waitFor(() => {
      expect(input).not.toHaveValue(text)
    })

    expect(onInputChange).not.toBeCalled()
  })

  it('should render with error', () => {
    const { container } = render(
      <TextField
        icon={<ShoppingCartIcon data-testid="icon" />}
        label="TextField"
        error="Erro message"
      />
    )

    expect(screen.getByText(/erro message/i)).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })
})
