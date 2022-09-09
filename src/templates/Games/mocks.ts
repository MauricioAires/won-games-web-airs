import { MockedResponse } from '@apollo/client/testing'
import { QUERY_GAMES } from 'graphql/queries/games'

export const mockNoGames = {
  request: {
    query: QUERY_GAMES,
    variables: {
      limit: parseInt(process.env.NEXT_PUBLIC_GAMES_LIMIT!),
      where: {}
    }
  },
  result: {
    data: {
      games: [],
      gamesConnection: {
        values: [],
        __typename: 'GameConnection'
      }
    }
  }
}

export const mockGames: MockedResponse = {
  request: {
    query: QUERY_GAMES,
    variables: {
      limit: parseInt(process.env.NEXT_PUBLIC_GAMES_LIMIT!),
      where: {}
    }
  },
  result: {
    data: {
      games: [
        {
          id: '1',
          name: 'Sample Game',
          slug: 'sample-game',
          price: 518.39,
          developers: [{ name: 'sample developer' }],
          cover: {
            url: 'sample-game.jpg'
          },
          __typename: 'Game'
        }
      ],
      gamesConnection: {
        values: [{ id: '1' }, { id: '2' }],
        __typename: 'GameConnection'
      }
    }
  }
}

export const mockFetchMore: MockedResponse = {
  request: {
    query: QUERY_GAMES,
    variables: {
      limit: parseInt(process.env.NEXT_PUBLIC_GAMES_LIMIT!),
      start: 1,
      where: {}
    }
  },
  result: {
    data: {
      games: [
        {
          id: '2',
          name: 'Fetch More Game',
          slug: 'fetch-more',
          price: 518.39,
          developers: [{ name: 'sample developer' }],
          cover: {
            url: 'sample-game.jpg'
          },
          __typename: 'Game'
        }
      ],
      gamesConnection: {
        values: [{ id: '1' }, { id: '2' }],
        __typename: 'GameConnection'
      }
    }
  }
}
