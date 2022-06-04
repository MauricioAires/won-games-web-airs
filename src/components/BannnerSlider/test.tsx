import { render, screen } from '@testing-library/react'

import BannnerSlider from '.'

describe('<BannnerSlider />', () => {
  it('should render the heading', () => {
    render(<BannnerSlider />)

    expect(
      screen.getByRole('heading', { name: /BannnerSlider/i })
    ).toBeInTheDocument()
  })
})
