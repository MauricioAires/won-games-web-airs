import 'match-media-mock'
import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import gameMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

import Showcase, { ShowcaseProps } from '.'

const props: ShowcaseProps = {
  title: 'Most Popular',
  highlight: highlightMock,
  games: gameMock.slice(0, 1)
}

const sut = (props: ShowcaseProps) => renderWithTheme(<Showcase {...props} />)

describe('<Showcase />', () => {
  it('should render full showcase', () => {
    sut(props)

    expect(
      screen.getByRole('heading', {
        name: /most popular/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: highlightMock.title
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: gameMock[0].title
      })
    ).toBeInTheDocument()
  })
  it('shluld render whithout title', () => {
    sut({
      games: props.games,
      highlight: props.highlight
    })

    screen.getByRole('heading', {
      name: highlightMock.title
    })
    screen.getByRole('heading', {
      name: gameMock[0].title
    })

    expect(
      screen.queryByRole('heading', {
        name: /most popular/i
      })
    ).not.toBeInTheDocument()
  })
  it('shluld render whithout highlight', () => {
    sut({
      games: props.games,
      title: props.title
    })

    screen.getByRole('heading', {
      name: /most popular/i
    })

    screen.getByRole('heading', {
      name: gameMock[0].title
    })

    expect(
      screen.queryByRole('heading', {
        name: highlightMock.title
      })
    ).not.toBeInTheDocument()
  })
  it('shluld render whithout games', () => {
    sut({
      highlight: props.highlight,
      title: props.title
    })

    screen.getByRole('heading', {
      name: /most popular/i
    })

    screen.getByRole('heading', {
      name: highlightMock.title
    })

    expect(
      screen.queryByRole('heading', {
        name: gameMock[0].title
      })
    ).not.toBeInTheDocument()
  })
})
