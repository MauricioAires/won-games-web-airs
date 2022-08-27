import 'match-media.mock'
import React from 'react'
import { screen, render } from 'utils/test-utils'

import Profile from '.'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    asPath: '/profile/me'
  }))
}))

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>
  }
}))

jest.mock('components/Heading', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Heading">{children}</div>
  }
}))

jest.mock('components/ProfileMenu', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock ProfileMenu" />
  }
}))

const sut = () => render(<Profile>Loren Ipsum</Profile>)

describe('<Profile />', () => {
  it('should render de sections', () => {
    sut()

    expect(screen.getByText('Loren Ipsum')).toBeInTheDocument()
    expect(screen.getByText('My profile')).toBeInTheDocument()
    expect(screen.getByTestId('Mock ProfileMenu')).toBeInTheDocument()
  })
})
