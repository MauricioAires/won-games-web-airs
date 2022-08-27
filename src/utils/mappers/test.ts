import { QueryOrders_orders } from './../../graphql/generated/QueryOrders'
import { QueryGames_games } from './../../graphql/generated/QueryGames'
import {
  QueryHome_banners,
  QueryHome_sections_freeGames_highlight
} from './../../graphql/generated/QueryHome'
import { highlightMapper } from './../mappers'

import { bannerMapper, gamesMapper, cartMapper, ordersMapper } from '.'

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
describe('ordersMapper()', () => {
  it('should return empty array if no orders', () => {
    expect(ordersMapper(undefined)).toStrictEqual([])
  })

  it('should return mapper items', () => {
    const orders = [
      {
        __typename: 'Order',
        id: '1',
        card_brand: 'visa',
        card_last4: '4242',
        created_at: '2021-04-14T18:41:48.358Z',
        games: [
          {
            id: '1',
            name: 'game',
            developers: [
              {
                name: 'developer'
              }
            ],
            slug: 'game',
            cover: {
              url: '/image.jpg'
            },
            price: 10
          }
        ]
      }
    ] as QueryOrders_orders[]

    expect(ordersMapper(orders)).toStrictEqual([
      {
        id: '1',
        paymentInfo: {
          flag: 'visa',
          img: '/img/cards/visa.png',
          number: '**** **** **** 4242',
          purchaseDate: 'Purchase made on Apr 14, 2021'
        },
        games: [
          {
            id: '1',
            title: 'game',
            downloadLink:
              'https://wongames.com/game/download/yuYT56Tgh431LkjhNBgdf',
            img: '/image.jpg',
            price: '$10.00'
          }
        ]
      }
    ])
  })

  it('should return free game when its free', () => {
    const orders = [
      {
        __typename: 'Order',
        id: '1',
        card_brand: null,
        card_last4: null,
        created_at: '2021-04-14T18:41:48.358Z',
        games: [
          {
            id: '1',
            name: 'game',
            developers: [
              {
                name: 'developer'
              }
            ],
            slug: 'game',
            cover: {
              url: '/image.jpg'
            },
            price: 0
          }
        ]
      }
    ] as QueryOrders_orders[]

    expect(ordersMapper(orders)).toStrictEqual([
      {
        id: '1',
        paymentInfo: {
          flag: null,
          img: null,
          number: 'Free Game',
          purchaseDate: 'Purchase made on Apr 14, 2021'
        },
        games: [
          {
            id: '1',
            title: 'game',
            downloadLink:
              'https://wongames.com/game/download/yuYT56Tgh431LkjhNBgdf',
            img: '/image.jpg',
            price: '$0.00'
          }
        ]
      }
    ])
  })
})
