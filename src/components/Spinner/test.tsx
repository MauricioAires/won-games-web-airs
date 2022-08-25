import { screen, render } from 'utils/test-utils'

import Spinner from '.'

const sut = () => render(<Spinner />)

describe('<Spinner />', () => {
  it('Should render correctly', () => {
    sut()

    expect(screen.getByTitle(/loading/i)).toBeInTheDocument()
  })
})
