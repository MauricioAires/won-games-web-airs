import 'match-media-mock'
import React from 'react'
import { renderWithTheme } from 'utils/tests/helpers'

import mockGames from 'components/GameCardSlider/mock'
import mockHighlight from 'components/Highlight/mock'
import mockCartList from 'components/CartList/mock'
import mockPaymentOptions from 'components/PaymentOptions/mock'

import Cart, { CartTemplateProps } from '.'

import { screen } from '@testing-library/react'

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testdid="Mock Base">{children}</div>
  }
}))

jest.mock('components/Showcase', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Showcase" />
  }
}))

jest.mock('components/CartList', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Cart" />
  }
}))

jest.mock('components/PaymentOptions', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock PaymentOptions" />
  }
}))

jest.mock('components/Empty', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Empty" />
  }
}))

const props: CartTemplateProps = {
  items: mockCartList,
  total: 'R$ 430,00',
  recommendedGames: mockGames,
  recommendedHighlight: mockHighlight,
  cards: mockPaymentOptions
}

const sut = (props: CartTemplateProps) => renderWithTheme(<Cart {...props} />)

describe('<Cart />', () => {
  it('should render sections', () => {
    sut(props)

    expect(
      screen.getByRole('heading', {
        name: /my cart/i
      })
    ).toBeInTheDocument()

    expect(screen.getByTestId('Mock Cart')).toBeInTheDocument()
    expect(screen.getByTestId('Mock PaymentOptions')).toBeInTheDocument()
    expect(screen.getByTestId('Mock Showcase')).toBeInTheDocument()
    expect(screen.queryByTestId('Mock Empty')).not.toBeInTheDocument()
  })

  it('should render empty section if there are not items', () => {
    sut({
      ...props,
      items: []
    })

    expect(screen.getByTestId('Mock Empty')).toBeInTheDocument()
  })
})
