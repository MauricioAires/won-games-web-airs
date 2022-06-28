import Link from 'next/link'
import {
  AccountCircleIcon,
  FormatListBulletedIcon,
  CreditCardIcon,
  ExitToAppIcon
} from 'styles/icons'

import * as S from './styles'

const ProfileMenu = () => (
  <S.Nav>
    <Link href="/profile/me" passHref>
      <S.Link>
        <AccountCircleIcon size={24} />
        <span>My profile</span>
      </S.Link>
    </Link>

    <Link href="/profile/cards" passHref>
      <S.Link>
        <CreditCardIcon size={24} />
        <span>My Cards</span>
      </S.Link>
    </Link>

    <Link href="/profile/orders" passHref>
      <S.Link>
        <FormatListBulletedIcon size={24} />
        <span>My orders</span>
      </S.Link>
    </Link>

    <Link href="/logout" passHref>
      <S.Link>
        <ExitToAppIcon size={24} />
        <span>Sign out</span>
      </S.Link>
    </Link>
  </S.Nav>
)

export default ProfileMenu
