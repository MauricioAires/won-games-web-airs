import { screen, render } from 'utils/test-utils'

import GameItem, { GameItemProps } from '.'

import mockGameItem from './mock'

const props: GameItemProps = mockGameItem

const sut = (props: GameItemProps) => render(<GameItem {...props} />)

describe('<GameItem />', () => {
  it('should render the item', () => {
    sut(props)

    expect(
      screen.getByRole('heading', {
        name: props.title
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('img', {
        name: props.title
      })
    ).toHaveAttribute('src', props.img)

    expect(screen.getByText('R$ 215,00')).toBeInTheDocument()
  })

  it('should render the item with download link', () => {
    const downloadLink = 'https://link'

    sut({
      ...props,
      downloadLink: downloadLink
    })

    expect(
      screen.getByRole('link', {
        name: `Get ${props.title} here`
      })
    ).toHaveAttribute('href', downloadLink)
  })
  it('should render the payment info', () => {
    const paymentInfo = {
      flag: 'mastercard',
      img: '/img/master-card.png',
      number: '**** **** **** 4326',
      purchaseDate: 'Purchase made on 07/20/2020 at 20:32'
    }

    sut({
      ...props,
      paymentInfo: paymentInfo
    })

    expect(
      screen.getByRole('img', {
        name: paymentInfo.flag
      })
    ).toHaveAttribute('src', paymentInfo.img)

    expect(screen.getByText(paymentInfo.number)).toBeInTheDocument()
    expect(screen.getByText(paymentInfo.purchaseDate)).toBeInTheDocument()
  })
})
