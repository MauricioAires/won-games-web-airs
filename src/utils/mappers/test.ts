import { QueryGames_games } from './../../graphql/generated/QueryGames'
import {
  QueryHome_banners,
  QueryHome_sections_freeGames_highlight
} from './../../graphql/generated/QueryHome'
import { highlightMapper } from './../mappers'

import { bannerMapper, gamesMapper, cartMapper } from '.'

describe('$bannerMapper', () => {
  it('should return the rigth format when mapper', () => {
    const banner = [
      {
        __typename: 'Banner',
        title: 'banner title',
        subtitle: 'banner subtitle',
        image: {
          url: '/imgage.jpg'
        },
        button: {
          label: 'button label',
          link: 'button link'
        },
        ribbon: {
          text: 'ribbon text',
          color: 'primary',
          size: 'small'
        }
      } as QueryHome_banners
    ]

    expect(bannerMapper(banner)).toStrictEqual([
      {
        img: '/imgage.jpg',
        title: 'banner title',
        subtitle: 'banner subtitle',
        buttonLabel: 'button label',
        buttonLink: 'button link',
        ribbon: 'ribbon text',
        ribbonColor: 'primary',
        ribbonSize: 'small'
      }
    ])
  })
})
describe('gamesMapper()', () => {
  it('should return an empty array if there are no games', () => {
    expect(gamesMapper(null)).toStrictEqual([])
  })

  it('should return the rigth format when mapper', () => {
    const games = [
      {
        __typename: 'Game',
        id: '1',
        name: 'game title',
        slug: 'game_slug',
        cover: {
          url: 'cover.jpg'
        },
        developers: [
          {
            name: 'developer name'
          }
        ],
        price: 100
      } as QueryGames_games
    ]

    expect(gamesMapper(games)).toStrictEqual([
      {
        id: '1',
        title: 'game title',
        slug: 'game_slug',
        developer: 'developer name',
        img: 'cover.jpg',
        price: 100
      }
    ])
  })
})
describe('bannerMapper()', () => {
  it('should return the rigth format when mapper', () => {
    const highlight = {
      __typename: 'ComponentPageHighlight',
      title: 'highlight title',
      subtitle: 'highlight subtitle',
      background: {
        url: 'background.jpg'
      },
      floatImage: {
        url: 'floatImage.jpg'
      },
      buttonLabel: 'button label',
      buttonLink: 'button link',
      alignment: 'left'
    } as QueryHome_sections_freeGames_highlight

    expect(highlightMapper(highlight)).toStrictEqual({
      title: 'highlight title',
      subtitle: 'highlight subtitle',
      backgroundImage: 'background.jpg',
      floatImage: 'floatImage.jpg',
      buttonLabel: 'button label',
      buttonLink: 'button link',
      alignment: 'left'
    })
  })
})

describe('cartMapper()', () => {
  it('should return empty array if no games', () => {
    expect(cartMapper(undefined)).toStrictEqual([])
  })

  it('should return mapped items', () => {
    const game = {
      id: '1',
      cover: {
        url: '/image.jpg'
      },
      name: 'game',
      price: 10
    } as QueryGames_games

    expect(cartMapper([game])).toStrictEqual([
      {
        id: '1',
        img: '/image.jpg',
        title: 'game',
        price: '$10.00'
      }
    ])
  })
})
