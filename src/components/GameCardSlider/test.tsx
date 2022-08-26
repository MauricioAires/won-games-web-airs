import 'match-media-mock'
import 'session.mock'

import { screen, render } from 'utils/test-utils'

import mockGameSlider from './mock'

import GameCardSlider, { GameCardSliderProps } from '.'

const props: GameCardSliderProps = {
  items: mockGameSlider
}

const sut = (props: GameCardSliderProps) =>
  render(<GameCardSlider {...props} />)

describe('<GameSlider />', () => {
  it('should render with 4 active items', () => {
    const { container } = sut(props)

    expect(container.querySelectorAll('.slick-active')).toHaveLength(4)
  })

  it('should render white arrows if color passed', () => {
    sut({
      ...props,
      color: 'white'
    })

    expect(screen.getByLabelText(/previous games/i)).toHaveStyle({
      color: '#FAFAFA'
    })
    expect(screen.getByLabelText(/next games/i)).toHaveStyle({
      color: '#FAFAFA'
    })
  })
})
