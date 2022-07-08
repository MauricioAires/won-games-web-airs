import React from 'react'
import apolloCache from 'utils/apolloCache'

import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'

import mockItemsProps from 'components/ExploreSidebar/mock'

import Game, { GamesTemplateProps } from '.'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const push = jest.fn()

useRouter.mockImplementation(() => ({
  push,
  query: '',
  asPath: '',
  route: '/',
  prefetch: jest.fn(() => null) /// necessário para quando utilizado o [ somehow ]
}))

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>
  }
}))

jest.mock('components/ExploreSidebar', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock ExploreSideBar" />
  }
}))

const props: GamesTemplateProps = {
  filterItems: mockItemsProps
}

const sut = (props: GamesTemplateProps, mock: ReadonlyArray<MockedResponse>) =>
  renderWithTheme(
    <MockedProvider mocks={mock} cache={apolloCache}>
      <Game {...props} />
    </MockedProvider>
  )

describe('<Games />', () => {
  it('should render empty when no games found', async () => {
    sut(props, [])

    expect(
      await screen.findByText(/we didn't find any games with this filter/i)
    ).toBeInTheDocument()
  })

  // it('should render sections', async () => {
  //   sut(props, [mockGames])

  //   expect(await screen.findByTestId('Mock ExploreSideBar')).toBeInTheDocument()

  //   expect(await screen.findByText(/Sample Game/i)).toBeInTheDocument()
  //   expect(
  //     screen.getByRole('button', {
  //       name: /show more/i
  //     })
  //   ).toBeInTheDocument()
  // })

  // it.skip('should render more games whrn show more is clicked', async () => {
  //   sut(props, [mockGames, mockFetchMore])

  //   expect(await screen.findByText(/Sample Game/i)).toBeInTheDocument()
  //   expect(screen.queryByText(/Fetch More Game/i)).not.toBeInTheDocument()

  //   await userEvent.click(
  //     screen.getByRole('button', {
  //       name: /show more/i
  //     })
  //   )

  //   expect(await screen.findByText(/Fetch More Game/i)).toBeInTheDocument()
  // })
})
