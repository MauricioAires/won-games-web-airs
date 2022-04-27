import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render, RenderResult } from '@testing-library/react'

import { light } from 'styles/themes'

export const renderWithTheme = (children: React.ReactNode): RenderResult =>
  render(<ThemeProvider theme={light}>{children}</ThemeProvider>)
