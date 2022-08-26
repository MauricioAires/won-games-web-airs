import Profile from 'templates/Profile'

import FormProfile, { FormProfileProps } from 'components/FormProfile'
import { GetServerSidePropsContext } from 'next'
import protectedRouter from 'utils/protected-routes'
import { initializeApollo } from 'utils/apollo'
import {
  queryProfileMe,
  queryProfileMeVariables
} from 'graphql/generated/queryProfileMe'
import { QUERY_PROFILE_ME } from 'graphql/queries/profile'

export default function MePage(props: FormProfileProps) {
  return (
    <Profile>
      <FormProfile {...props} />
    </Profile>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRouter(context)
  const apolloCliente = initializeApollo(null, session)

  const { data } = await apolloCliente.query<
    queryProfileMe,
    queryProfileMeVariables
  >({
    query: QUERY_PROFILE_ME,
    variables: {
      identifier: session?.id as string
    }
  })
  return {
    props: {
      session,
      username: data?.user?.username,
      email: data?.user?.email
    }
  }
}
