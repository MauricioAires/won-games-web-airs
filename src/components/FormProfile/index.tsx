import Button from 'components/Button'
import Heading from 'components/Heading'
import TextField from 'components/TextField'
import Link from 'next/link'
import * as S from './styles'

export type FormProfileProps = {
  username: string
  email: string
}

const FormProfile = ({ email, username }: FormProfileProps) => (
  <>
    <Heading size="small" color="black" lineColor="primary" lineBottom>
      My profile
    </Heading>

    <S.Form>
      <TextField
        label="Name"
        name="username"
        placeholder="Username"
        initialValue={username}
      />

      <TextField
        label="E-mail"
        type="email"
        name="email"
        initialValue={email}
        disabled
      />

      <S.ButtonWrapper>
        <Link href={`/forgot-password?email=${email}`} passHref>
          <Button size="medium" minimal as="a">
            Reset password
          </Button>
        </Link>
        <Button size="medium" type="submit">
          Save
        </Button>
      </S.ButtonWrapper>
    </S.Form>
  </>
)

export default FormProfile
