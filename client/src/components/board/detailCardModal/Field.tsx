import {
  Card,
  Field as GField,
  useUpdateCardMutation
} from '../../../graphql/gen-types'
import { useAppSelector } from '../../../redux/store'

export default function Field({ fieldId }: { fieldId: string }) {
  const data = useAppSelector(state => {
    const fieid = state.board.blocks[fieldId] as GField
    let fieldData: string | string[] | number | undefined = undefined
    let cardOpenId: string | undefined

    try {
      cardOpenId = state.board.cardOpenId
      if (cardOpenId)
        fieldData = (state.board.blocks[cardOpenId] as Card).fieldsData[fieldId]
    } catch (err) {
      console.log(err)
    }

    return {
      fieid,
      fieldData,
      cardOpenId
    }
  })
  const [updateCardMuatation] = useUpdateCardMutation()

  if (!data) return

  return <></>
}
