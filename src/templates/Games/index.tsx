import { useQueryGame } from 'graphql/queries/games'

import Base from 'templates/Base'
import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar'
import GameCard from 'components/GameCard'
import Empty from 'components/Empty'
import { KeyboardArrowDownIcon } from 'styles/icons'
import { Grid } from 'components/Grid'

import * as S from './styles'
import { useRouter } from 'next/router'
import { parseQueryStringToWhere, parseQueryStringToFilter } from 'utils/filter'
import { ParsedUrlQueryInput } from 'querystring'
import { useCallback, useMemo } from 'react'
import Image from 'next/image'
import { getImageUrl } from 'utils/getImageUrl'

export type GamesTemplateProps = {
  filterItems: ItemProps[]
}

const Games = ({ filterItems }: GamesTemplateProps) => {
  const { push, query } = useRouter()
  const { data, loading, fetchMore } = useQueryGame({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: parseInt(process.env.NEXT_PUBLIC_GAMES_LIMIT!),
      where: parseQueryStringToWhere({
        queryString: query,
        filterItems
      }),
      sort: query.sort as string | null
    }
  })

  const hasMoreGames = useMemo(() => {
    if (!data) {
      return true
    }
    return data.games.length < (data.gamesConnection?.values?.length || 0)
  }, [data])

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
        limit: 9,
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

        <section>
          <>
            {data?.games.length ? (
              <>
                <Grid>
                  {data?.games!.map((game) => (
                    <GameCard
                      id={game.id}
                      key={game.slug}
                      title={game.name}
                      slug={game.slug}
                      developer={game.developers[0].name}
                      img={
                        getImageUrl(
                          game.cover?.url || '/img/sgames/cyberpunk-1.jpg'
                        ) as string
                      }
                      price={game.price}
                    />
                  ))}
                </Grid>

                {hasMoreGames && (
                  <S.ShowMore>
                    {loading ? (
                      <Image
                        src="/img/dots.svg"
                        alt="loading more games"
                        width={40}
                        height={10}
                      />
                    ) : (
                      <S.ShowMoreButton role="button" onClick={handleShowMore}>
                        <p>Show More</p>
                        <KeyboardArrowDownIcon size={35} />
                      </S.ShowMoreButton>
                    )}
                  </S.ShowMore>
                )}
              </>
            ) : (
              <Empty
                title=":("
                description="We didn't find any games with this filter"
              />
            )}
          </>
        </section>
      </S.Main>
    </Base>
  )
}

export default Games
