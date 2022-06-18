import { ArrowBackIosIcon, ArrowForwardIosIcon } from 'styles/icons'

import Slider, { SliderSettings } from 'components/Slider'
import * as S from './styles'

export type GalleryImageProps = {
  src: string
  label: string
}

export type GalleryProps = {
  items: GalleryImageProps[]
}

const settings: SliderSettings = {
  arrows: true,
  infinite: false,
  slidesToShow: 4,
  lazyLoad: 'ondemand',
  responsive: [
    {
      breakpoint: 1375,
      settings: {
        arrows: false,
        slidesToShow: 3.2,
        draggable: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        arrows: false,
        slidesToShow: 2.2,
        draggable: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        slidesToShow: 2.2,
        draggable: true
      }
    }
  ],
  nextArrow: <ArrowForwardIosIcon aria-label="next image" />,
  prevArrow: <ArrowBackIosIcon aria-label="previous image" />
}

const Gallery = ({ items }: GalleryProps) => (
  <S.Wrapper>
    <Slider settings={settings}>
      {items.map((item, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          role="button"
          key={`thumb-${index}`}
          src={item.src}
          loading="lazy"
          alt={`Thumb - ${item.label}`}
        />
      ))}
    </Slider>
  </S.Wrapper>
)

export default Gallery
