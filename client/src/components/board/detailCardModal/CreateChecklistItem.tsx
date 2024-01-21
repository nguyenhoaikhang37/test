import { useState } from 'react'
import { useCreateChecklistItemMutation } from '../../../graphql/gen-types'
import Checkbox from '../../commons/Checkbox'
import Input from '../../commons/Input'

export default function CreateChecklistItem({
  checklistId
}: {
  checklistId: string
}) {
  const [value, setValue] = useState('')

  const [createChecklistItem, { loading }] = useCreateChecklistItemMutation({
    onCompleted() {
      setValue('')
    }
  })

  return (
    <div className='flex items-center justify-end gap-2'>
      <Checkbox isDisabled={true} iconClassName='opacity-20' />
      <Input
        className='h-6 flex-1 border-b border-transparent bg-transparent outline-none hover:border-blue-400 focus:border-blue-400'
        placeholder='Create checklist item input'
        value={value}
        onChange={e => setValue(e.target.value)}
        saveType={['onEnter']}
        blurOnSubmit={false}
        onSubmit={() => {
          if (value && !loading && checklistId) {
            createChecklistItem({
              variables: {
                item: {
                  title: value
                },
                checklistId
              }
            })
          }
        }}
      />
    </div>
  )
}
