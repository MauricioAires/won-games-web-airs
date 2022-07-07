import Base from 'templates/Base'
import Heading from 'components/Heading'
import GameCard, { GameCardProps } from 'components/GameCard'
import Showcase from 'components/Showcase'

import { Divider } from 'components/Divider'
import { Container } from 'components/Container'
import { HighlightProps } from 'components/Highlight'
import { Grid } from 'components/Grid'
import Empty from 'components/Empty'

export type WishlistTemplateProps = {
  games?: GameCardProps[]
  recommendedGames: GameCardProps[]
  recommendedHighlight: HighlightProps
  recommendedTitle?: string
}

const Wishlist = ({
  recommendedGames,
  recommendedHighlight,
  recommendedTitle = 'You may like these games',
  games
}: WishlistTemplateProps) => (
  <Base>
    <Container>
      <Heading lineLeft lineColor="secondary">
        Wishlist
      </Heading>

      {games?.length ? (
        <Grid>
          {games.map((game, index) => (
            <GameCard key={`wishlist-${index}`} {...game} />
          ))}
        </Grid>
      ) : (
        <Empty
          title="Your wishlist is empty"
          description="Games added to your wishlist will appear here"
        />
      )}

      <Divider />
    </Container>

    <Showcase
      title={recommendedTitle}
      games={recommendedGames}
      highlight={recommendedHighlight}
    />
  </Base>
)

export default Wishlist
