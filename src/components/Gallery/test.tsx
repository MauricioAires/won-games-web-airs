import 'match-media-mock'
import mockGallery from './mock'
import Gallery, { GalleryProps } from '.'
import { renderWithTheme } from 'utils/tests/helpers'

const props = {
  items: mockGallery
}

const sut = (props: GalleryProps) => renderWithTheme(<Gallery {...props} />)
describe('<Gallery />', () => {
  it('should render the heading', () => {
    sut(props)
  })
})
