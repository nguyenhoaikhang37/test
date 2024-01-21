import { Attachment } from '../../../../graphql/gen-types'
import { useAppSelector } from '../../../../redux/store'

type Props = {
  attachmentId: string
}

export default function Attachment({ attachmentId }: Props) {
  const attachment = useAppSelector(
    state => state.board.blocks[attachmentId] as Attachment
  )
  if (!attachment) return <></>

  return <div>{attachment.title}</div>
}
