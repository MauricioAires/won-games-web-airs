import Profile from 'templates/Profile'

import FormProfile, { FormProfileProps } from 'components/FormProfile'
import { GetServerSidePropsContext } from 'next'
import protectedRouter from 'utils/protected-routes'
import { initializeApollo } from 'utils/apollo'
import { queryProfileMe } from 'graphql/generated/queryProfileMe'
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

  const { data } = await apolloCliente.query<queryProfileMe>({
    query: QUERY_PROFILE_ME
  })
  return {
    props: {
      session,
      username: data?.me?.username,
      email: data?.me?.email
    }
  }
}
