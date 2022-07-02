import Empty from 'components/Empty'
import Base from 'templates/Base'

export default function NotFoutPage() {
  return (
    <Base>
      <Empty
        title="404 : Not found"
        description="Ops...this page does not exist. Go back to the store and enjoy our ofers"
        hasLink
      />
    </Base>
  )
}
