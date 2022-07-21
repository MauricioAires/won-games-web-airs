import { signOut } from 'next-auth/react'
import Link from 'next/link'
import {
  AccountCircleIcon,
  FormatListBulletedIcon,
  CreditCardIcon,
  ExitToAppIcon
} from 'styles/icons'

import * as S from './styles'

export type ProfileMenuProps = {
  activeLink?: '/profile/me' | '/profile/cards' | '/profile/orders' | string
}

const ProfileMenu = ({ activeLink }: ProfileMenuProps) => (
  <S.Nav>
    <Link href="/profile/me" passHref>
      <S.Link isActive={activeLink === '/profile/me'} title="My profile">
        <AccountCircleIcon size={24} />
        <span>My profile</span>
      </S.Link>
    </Link>

    <Link href="/profile/cards" passHref>
      <S.Link isActive={activeLink === '/profile/cards'} title="My cards ">
        <CreditCardIcon size={24} />
        <span>My Cards</span>
      </S.Link>
    </Link>

    <Link href="/profile/orders" passHref>
      <S.Link isActive={activeLink === '/profile/orders'} title="My orders">
        <FormatListBulletedIcon size={24} />
        <span>My orders</span>
      </S.Link>
    </Link>

    <S.Link role="button" onClick={() => signOut()}>
      <ExitToAppIcon size={24} title="Sign out" />
      <span>Sign out</span>
    </S.Link>
  </S.Nav>
)

export default ProfileMenu
