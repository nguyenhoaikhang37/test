import {
  Checklist,
  ChecklistItem,
  useUpdateChecklistItemsMutation
} from '../../../graphql/gen-types'
import Checkbox, { TCheckValue } from '../../commons/Checkbox'
import Input from '../../commons/Input'
import CreateChecklistItem from './CreateChecklistItem'

const getCheckValue = (items: ChecklistItem[]) => {
  let checkValue: TCheckValue = 'unCheck'

  const checkItemCount = items.filter(item => item.isCheck).length

  if (items.length > 0) {
    if (checkItemCount === items.length) checkValue = 'check'
    else if (checkItemCount > 0) checkValue = 'semiCheck'
  }

  return checkValue
}

export default function Checklist({ checklist }: { checklist: Checklist }) {
  const [updateItems] = useUpdateChecklistItemsMutation()
  const isDisabled = checklist.items.length === 0

  return (
    <div className='flex flex-col gap-1 text-gray-700'>
      <div className='flex gap-2'>
        <Checkbox
          isDisabled={isDisabled}
          iconClassName={`${isDisabled && 'opacity-20'}`}
          checkValue={getCheckValue(checklist.items || [])}
          onChange={value => {
            if (value === 'check')
              updateItems({
                variables: {
                  checklistId: checklist._id,
                  items:
                    checklist.items?.map(({ _id }) => ({
                      _id,
                      isCheck: true
                    })) || []
                }
              })

            if (value === 'unCheck') {
              updateItems({
                variables: {
                  checklistId: checklist._id,
                  items:
                    checklist.items?.map(({ _id }) => ({
                      _id,
                      isCheck: false
                    })) || []
                }
              })
            }
          }}
        />

        <Input
          className='w-full truncate bg-transparent text-black outline-none'
          placeholder='Checklist title ...'
          defaultValue={checklist?.title}
        />
      </div>

      <div className='ml-[7px] border-l pl-4'>
        {checklist?.items?.map(({ _id, isCheck, title }) => (
          <div className='flex h-6 items-center gap-2' key={_id}>
            <Checkbox
              onChange={() =>
                updateItems({
                  variables: {
                    checklistId: checklist._id,
                    items: {
                      _id,
                      isCheck: !isCheck
                    }
                  }
                })
              }
              checkValue={isCheck ? 'check' : 'unCheck'}
            />
            <Input
              placeholder='Checklist item title'
              className='w-full bg-transparent outline-none'
              defaultValue={title}
              errorClassName='bg-black'
              onSubmit={e => {
                if (title !== e.target.value)
                  updateItems({
                    variables: {
                      checklistId: checklist._id,
                      items: {
                        _id,
                        title: e.target.value
                      }
                    }
                  })
              }}
            />
          </div>
        ))}

        <CreateChecklistItem checklistId={checklist._id} />
      </div>
    </div>
  )
}
