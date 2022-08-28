import { NextSeo } from 'next-seo'
import Image from 'next/image'

import Base from 'templates/Base'

import Showcase from 'components/Showcase'
import TextContent from 'components/TextContent'
import Gallery, { GalleryImageProps } from 'components/Gallery'
import GameDetails, { GameDetailsProps } from 'components/GameDetails'
import GameInfo, { GameInfoProps } from 'components/GameInfo'
import { Divider } from 'components/Divider'
import { GameCardProps } from 'components/GameCard'
import { HighlightProps } from 'components/Highlight'

import * as S from './styles'

export type GameTemplateProps = {
  cover: string
  slug?: string
  gameInfo: GameInfoProps
  gallery?: GalleryImageProps[]
  description: string
  details: GameDetailsProps
  upcomingTitle: string
  upcomingGames: GameCardProps[]
  upcomingHighlight: HighlightProps
  recommendedGames: GameCardProps[]
  recommendedTitle: string
}

const Game = ({
  slug,
  cover,
  gameInfo,
  gallery,
  description,
  details,
  upcomingTitle,
  upcomingGames,
  upcomingHighlight,
  recommendedTitle,
  recommendedGames
}: GameTemplateProps) => (
  <Base>
    <NextSeo
      title={`${gameInfo.title} - Won Games`}
      description={gameInfo.description}
      canonical={`https://wongames/${slug}`}
      openGraph={{
        url: `https://wongames/${slug}`,
        title: `${gameInfo.title} - Won Games`,
        description: gameInfo.description,
        images: [
          {
            url: cover,
            alt: gameInfo.title
          }
        ]
      }}
    />
    <S.CoverWrapper>
      <Image
        src={cover}
        aria-label={gameInfo.title}
        layout="fill"
        objectFit="cover"
      />
    </S.CoverWrapper>

    <S.Main>
      <S.SectionGameInfo>
        <GameInfo {...gameInfo} />
      </S.SectionGameInfo>

      <S.SectionGallery>
        {!!gallery && <Gallery items={gallery} />}
      </S.SectionGallery>

      <S.SectionDescription>
        <TextContent title="Description" content={description} />
      </S.SectionDescription>

      <S.SectionGameDetails>
        <GameDetails {...details} />

        <Divider />
      </S.SectionGameDetails>

      <Showcase
        title={upcomingTitle || 'Upcoming'}
        games={upcomingGames}
        highlight={upcomingHighlight}
      />

      <Showcase title={recommendedTitle} games={recommendedGames} />
    </S.Main>
  </Base>
)

export default Game
