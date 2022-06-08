import { ArrowBackIosIcon, ArrowForwardIosIcon } from 'styles/icons'

import GameCard, { GameCardProps } from 'components/GameCard'
import Slider, { SliderSettings } from 'components/Slider'
import * as S from './styles'

export type GameCardSliderProps = {
  items: GameCardProps[]
  color?: 'white' | 'black'
}

const settings: SliderSettings = {
  arrows: true,
  infinite: false,
  slidesToShow: 4,
  lazyLoad: 'progressive',
  responsive: [
    {
      breakpoint: 1375,
      settings: {
        arrows: false,
        slidesToShow: 3.2
      }
    },
    {
      breakpoint: 1024,
      settings: {
        arrows: false,
        slidesToShow: 2.2
      }
    },
    {
      breakpoint: 570,
      settings: {
        arrows: false,
        slidesToShow: 1.2
      }
    },
    {
      breakpoint: 575,
      settings: {
        arrows: false,
        slidesToShow: 1.1
      }
    }
  ],
  nextArrow: <ArrowForwardIosIcon aria-label="next games" />,
  prevArrow: <ArrowBackIosIcon aria-label="previous games" />
}

const GameCardSlider = ({ items, color = 'white' }: GameCardSliderProps) => (
  <S.Wrapper color={color}>
    <Slider settings={settings}>
      {items.map((item, index) => (
        <GameCard key={index} {...item} />
      ))}
    </Slider>
  </S.Wrapper>
)

export default GameCardSlider
