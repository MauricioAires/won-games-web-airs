import Base from 'templates/Base'
import Heading from 'components/Heading'
import GameCard, { GameCardProps } from 'components/GameCard'
import Showcase from 'components/Showcase'

import { Divider } from 'components/Divider'
import { Container } from 'components/Container'
import { HighlightProps } from 'components/Highlight'
import { Grid } from 'components/Grid'

export type WishlistTemplateProps = {
  games?: GameCardProps[]
  recommendedGames: GameCardProps[]
  recommendedHighlight: HighlightProps
}

const Wishlist = ({
  recommendedGames,
  recommendedHighlight,
  games
}: WishlistTemplateProps) => (
  <Base>
    <Container>
      <Heading lineLeft lineColor="secondary">
        Wishlist
      </Heading>

      <Grid>
        {games?.map((game, index) => (
          <GameCard key={`wishlist-${index}`} {...game} />
        ))}
      </Grid>

      <Divider />
    </Container>

    <Showcase
      title="You ma li ke these games"
      games={recommendedGames}
      highlight={recommendedHighlight}
    />
  </Base>
)

export default Wishlist
