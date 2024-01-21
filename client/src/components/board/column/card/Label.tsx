import { Label } from '../../../../graphql/gen-types'
import { useAppSelector } from '../../../../redux/store'

type Props = {
  labelId: string
}
export default function Label({ labelId }: Props) {
  const label = useAppSelector(state => state.board.blocks[labelId] as Label)

  if (!label) return <></>

  return <div className={`rounded p-1 bg-[${label.color}]`}>{label.title}</div>
}
