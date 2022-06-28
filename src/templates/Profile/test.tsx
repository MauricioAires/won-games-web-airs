import { renderWithTheme } from 'utils/tests/helpers'

import Profile from '.'

describe('<Profile />', () => {
  it('should render the heading', () => {
    renderWithTheme(
      <Profile>
        <div></div>
      </Profile>
    )
  })
})
