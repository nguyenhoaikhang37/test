import { BsSearch, BsSliders2, BsThreeDotsVertical } from 'react-icons/bs'
import { useAppSelector } from '../../../redux/store'

export default function BoardFilter() {
  const boardName = useAppSelector(state => {
    const teamId = state.workspace.activeContentId
    if (teamId) {
      const block = state.workspace.blocks[teamId]
      if (block.__typename === 'Board') {
        return block.title
      }
    }
  })
  return (
    <div className='flex items-center gap-3 px-3 py-2'>
      <p className='flex-1 truncate text-lg font-semibold text-gray-900'>
        {boardName || 'Board none'}
      </p>

      <div className='flex flex-1 justify-end gap-3'>
        <div className='flex items-center gap-3'>
          <div className='flex flex-1'>
            <div className='flex h-7 w-7 items-center justify-center rounded-full border border-white bg-slate-500 text-white'>
              A
            </div>
            <div className='flex h-7 w-7 translate-x-[-30%] items-center justify-center rounded-full border border-white bg-slate-500 text-white'>
              B
            </div>
            <div className='flex h-7 w-7 translate-x-[-60%] items-center justify-center rounded-full border border-white bg-slate-500 text-white'>
              C
            </div>
            <div className='flex h-7 w-7 translate-x-[-90%] items-center justify-center rounded-full border border-white bg-slate-500 text-white'>
              +3
            </div>

            <div className='flex h-7 w-7 translate-x-[-90%] items-center justify-center rounded-full border bg-gray-200 text-gray-700 hover:ring-1'>
              +
            </div>
          </div>
        </div>

        <div className='flex h-8 w-72 items-center gap-2 rounded bg-gray-100 px-3 ring-1 ring-transparent hover:ring-blue-400'>
          <BsSearch />
        </div>

        <button className='flex h-8 w-8 items-center justify-center gap-2 rounded bg-gray-100 ring-1 ring-transparent hover:ring-blue-400'>
          <BsSliders2 />
        </button>

        <button className='flex h-8 w-8 items-center justify-center gap-2 rounded bg-gray-100 ring-1 ring-transparent hover:ring-blue-400'>
          <BsThreeDotsVertical />
        </button>
      </div>
    </div>
  )
}
