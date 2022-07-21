import Link from 'next/link'
import Dropdown from 'components/Dropdown'
import { signOut } from 'next-auth/react'
import {
  AccountCircleIcon,
  ChevronDownIcon,
  ExitToAppIcon,
  FavoriteBorderIcon
} from 'styles/icons'
import * as S from './styles'

export type UserDropdownProps = {
  username: string
}

const UserDropdown = ({ username }: UserDropdownProps) => (
  <Dropdown
    title={
      <>
        <AccountCircleIcon size={24} />
        <S.Username>{username}</S.Username>
        <ChevronDownIcon size={24} />
      </>
    }
  >
    <S.Nav>
      <Link href="/profile/me" passHref>
        <S.Link>
          <AccountCircleIcon size={24} />
          <span>My profile</span>
        </S.Link>
      </Link>
      <Link href="/wishlist" passHref>
        <S.Link>
          <FavoriteBorderIcon size={24} />
          <span>Wishlist</span>
        </S.Link>
      </Link>

      <S.Link role="button" title="Sign out" onClick={() => signOut()}>
        <ExitToAppIcon size={24} />
        <span>Sign out</span>
      </S.Link>
    </S.Nav>
  </Dropdown>
)

export default UserDropdown
