import Button from 'components/Button'
import Heading from 'components/Heading'
import TextField from 'components/TextField'
import * as S from './styles'

const FormProfile = () => (
  <>
    <Heading size="small" color="black" lineColor="primary" lineBottom>
      My profile
    </Heading>

    <S.Form>
      <TextField
        label="Name"
        name="name"
        placeholder="Name"
        initialValue="John Cage"
      />

      <TextField
        label="E-mail"
        type="email"
        name="email"
        initialValue="johndoe@gmail.com"
        disabled
      />

      <TextField
        label="Password"
        placeholder="Type your password"
        type="password"
        name="password"
        initialValue="johndoe@gmail.com"
      />

      <TextField
        label="New Password"
        placeholder="new password"
        type="password"
        name="new_password"
        initialValue=""
      />

      <Button size="large" type="submit">
        Save
      </Button>
    </S.Form>
  </>
)

export default FormProfile
