import { BsCheck2Square } from 'react-icons/bs'
import {
  ChecklistItem,
  Checklist as TCheckList
} from '../../../graphql/gen-types'
import { useBlocks } from '../../../hooks/useArray'
import Checklist from './Checklist'
import CreateChecklist from './CreateChecklist'

export const CheckStatistic = ({ cardId }: { cardId: string }) => {
  const checklistItems = useBlocks(cardId, 'Checklist') as TCheckList[]

  let items: ChecklistItem[] = []

  checklistItems.forEach(clItem => {
    items = [...items, ...clItem.items]
  })

  return (
    <>
      {checklistItems.length > 0 && (
        <div className='flex items-center gap-1'>
          <BsCheck2Square className='h-4 w-4' />
          {`${items.filter(e => e.isCheck).length}/${items.length}`}
        </div>
      )}
    </>
  )
}

export default function SubTask({ cardId }: { cardId: string }) {
  const checklists = useBlocks(cardId, 'Checklist') as TCheckList[]
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-1'>
        <div className='flex flex-1 items-center gap-3'>
          <p className='font-semibold uppercase'>Sub Tasks</p>
        </div>
        <CheckStatistic cardId={cardId} />
      </div>
      <div className='flex flex-col gap-2'>
        {checklists.map(e => (
          <Checklist key={e._id} checklist={e} />
        ))}

        <CreateChecklist />
      </div>
    </div>
  )
}
