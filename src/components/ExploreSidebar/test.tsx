import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import mockExploreSidebar from './mock'

import ExploreSidebar, { ExploreSidebarProps } from '.'

const props: ExploreSidebarProps = {
  items: mockExploreSidebar
}

const sut = (props: ExploreSidebarProps) =>
  renderWithTheme(<ExploreSidebar {...props} />)

describe('<ExploreSidebar />', () => {
  it('should render headings', () => {
    sut(props)

    expect(
      screen.getByRole('heading', {
        name: /price/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /sort by/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /system/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /genre/i
      })
    ).toBeInTheDocument()
  })
  it('should render inputs', () => {
    sut(props)

    expect(
      screen.getByRole('checkbox', {
        name: /under \$50/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('radio', {
        name: /low to high/i
      })
    ).toBeInTheDocument()
  })
  it('should render the filter button', () => {
    sut(props)

    expect(
      screen.getByRole('button', {
        name: /filter/i
      })
    ).toBeInTheDocument
  })

  it('should check initial values that are passed', () => {
    sut({
      ...props,
      initialValues: {
        windows: true,
        sort_by: 'low-to-high'
      }
    })

    expect(
      screen.getByRole('checkbox', {
        name: /windows/i
      })
    ).toBeChecked()

    expect(
      screen.getByRole('radio', {
        name: /low to high/i
      })
    ).toBeChecked()
  })
})
