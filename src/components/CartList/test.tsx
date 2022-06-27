import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import mockCartList from './mock'

import CartList, { CartListProps } from '.'

const props: CartListProps = {
  items: mockCartList,
  total: 'R$ 330,00'
}

const sut = (props: CartListProps) => renderWithTheme(<CartList {...props} />)

describe('<CartList />', () => {
  it('should render the cart list', () => {
    sut(props)

    expect(screen.getAllByRole('heading')).toHaveLength(2)
    expect(screen.getByText('R$ 330,00')).toHaveStyle({
      color: '#F231A5'
    })
  })
})
