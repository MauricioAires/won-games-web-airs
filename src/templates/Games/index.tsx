import { useQueryGame } from 'graphql/queries/games'

import Base from 'templates/Base'
import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar'
import GameCard from 'components/GameCard'

import { KeyboardArrowDownIcon } from 'styles/icons'
import { Grid } from 'components/Grid'

import * as S from './styles'
import { useRouter } from 'next/router'
import { parseQueryStringToWhere, parseQueryStringToFilter } from 'utils/filter'
import { ParsedUrlQueryInput } from 'querystring'
import { useCallback } from 'react'

export type GamesTemplateProps = {
  filterItems: ItemProps[]
}

const Games = ({ filterItems }: GamesTemplateProps) => {
  const { push, query } = useRouter()
  const { data, loading, fetchMore } = useQueryGame({
    variables: {
      limit: 15,
      where: parseQueryStringToWhere({
        queryString: query,
        filterItems
      }),
      sort: query.sort as string | null
    }
  })

  const handleFilter = useCallback(
    (items: ParsedUrlQueryInput) => {
      push(
        {
          pathname: '/games',
          query: items
        },
        undefined,
        {
          shallow: true
        }
      )
    },
    [push]
  )

  const handleShowMore = () => {
    fetchMore({
      variables: {
        limit: 15,
        start: data?.games.length
      }
    })
    return
  }

  return (
    <Base>
      <S.Main>
        <ExploreSidebar
          initialValues={parseQueryStringToFilter({
            queryString: query,
            filterItems
          })}
          items={filterItems}
          onFilter={handleFilter}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <section>
            <Grid>
              {data?.games!.map((game) => (
                <GameCard
                  key={game.slug}
                  title={game.name}
                  slug={game.slug}
                  developer={game.developers[0].name}
                  img={game.cover?.url || '/img/sgames/cyberpunk-1.jpg'}
                  price={game.price}
                />
              ))}
            </Grid>

            <S.ShowMore role="button" onClick={handleShowMore}>
              <p>Show More</p>
              <KeyboardArrowDownIcon size={35} />
            </S.ShowMore>
          </section>
        )}
      </S.Main>
    </Base>
  )
}

export default Games
