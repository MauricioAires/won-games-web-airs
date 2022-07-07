import { useQueryGame } from 'graphql/queries/games'

import Base from 'templates/Base'
import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar'
import GameCard, { GameCardProps } from 'components/GameCard'

import { KeyboardArrowDownIcon } from 'styles/icons'
import { Grid } from 'components/Grid'

import * as S from './styles'

export type GamesTemplateProps = {
  games?: GameCardProps[]
  filterItems: ItemProps[]
}

const Games = ({ filterItems }: GamesTemplateProps) => {
  const { data, loading, fetchMore } = useQueryGame({
    variables: {
      limit: 15
    }
  })

  const handleFilter = () => {
    return
  }

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
        <ExploreSidebar items={filterItems} onFilter={handleFilter} />
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
