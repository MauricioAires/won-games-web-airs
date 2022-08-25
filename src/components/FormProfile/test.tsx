import { screen, render } from 'utils/test-utils'

import FormProfile, { FormProfileProps } from '.'

const sut = (props: FormProfileProps) => render(<FormProfile {...props} />)

describe('<FormProfile />', () => {
  it('should render the profile form', () => {
    sut({} as FormProfileProps)

    expect(
      screen.getByRole('heading', {
        name: /my profile/i
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('textbox', {
        name: /name/i
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('textbox', {
        name: /e-mail/i
      })
    ).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  })
})
