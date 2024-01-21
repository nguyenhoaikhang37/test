import { useState } from 'react'
import { useCreateChecklistMutation } from '../../../graphql/gen-types'
import { useAppSelector } from '../../../redux/store'
import Checkbox from '../../commons/Checkbox'
import Input from '../../commons/Input'

export default function CreateChecklist() {
  const [value, setValue] = useState('')
  const boardId = useAppSelector(state => state.board.boardId)
  const openCardId = useAppSelector(state => state.board.cardOpenId)
  const [createChecklist, { loading }] = useCreateChecklistMutation({
    onCompleted() {
      setValue('')
    }
  })

  return (
    <div className='flex items-center justify-end gap-2'>
      <Checkbox isDisabled={true} iconClassName='opacity-20' />
      <Input
        className='h-6 flex-1 border-b outline-none hover:border-blue-400 focus:border-blue-400'
        placeholder='Create checklist input'
        value={value}
        onChange={e => setValue(e.target.value)}
        saveType={['onEnter']}
        onSubmit={e => {
          if (value && !loading && openCardId && !!boardId) {
            createChecklist({
              variables: {
                input: {
                  title: value
                },
                cardId: openCardId,
                boardId
              }
            }).then(() => {
              e.target.focus()
            })
          }
        }}
      />
    </div>
  )
}
