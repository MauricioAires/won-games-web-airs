import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import {
  CartContext,
  CartContextData,
  CartContextDefaultValue
} from 'hooks/use-cart'

import { ThemeProvider } from 'styled-components'
import { light } from 'styles/themes'

export type CustomRenderProps = {
  cartProviderProps?: CartContextData
} & Omit<RenderOptions, 'queries'>

const customRender = (
  ui: ReactElement,
  {
    cartProviderProps = CartContextDefaultValue,
    ...renderOptions
  }: CustomRenderProps = {}
) =>
  render(
    <ThemeProvider theme={light}>
      <CartContext.Provider value={cartProviderProps}>
        {ui}
      </CartContext.Provider>
    </ThemeProvider>,
    renderOptions
  )

export * from '@testing-library/react'
export { customRender as render }
