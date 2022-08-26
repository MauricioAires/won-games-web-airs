import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import {
  CartContext,
  CartContextData,
  CartContextDefaultValue
} from 'hooks/use-cart'

import {
  WishlistDefaultValues,
  WishlistContextData,
  WishlistContext
} from 'hooks/use-wishlist'

import { ThemeProvider } from 'styled-components'
import { light } from 'styles/themes'

export type CustomRenderProps = {
  cartProviderProps?: CartContextData
  wishlistProviderProps?: WishlistContextData
} & Omit<RenderOptions, 'queries'>

const customRender = (
  ui: ReactElement,
  {
    cartProviderProps = CartContextDefaultValue,
    wishlistProviderProps = WishlistDefaultValues,
    ...renderOptions
  }: CustomRenderProps = {}
) =>
  render(
    <ThemeProvider theme={light}>
      <CartContext.Provider value={cartProviderProps}>
        <WishlistContext.Provider value={wishlistProviderProps}>
          {ui}
        </WishlistContext.Provider>
      </CartContext.Provider>
    </ThemeProvider>,
    renderOptions
  )

export * from '@testing-library/react'
export { customRender as render }
