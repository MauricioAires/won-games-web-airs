import { BannerFragment } from './../fragments/banner'
import { gql } from '@apollo/client'

export const QUERY_HOME = gql`
  query QueryHome {
    banners {
      ...BannerFragment
    }
  }

  ${BannerFragment}
`
