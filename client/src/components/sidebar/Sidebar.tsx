import { BsSearch } from 'react-icons/bs'
import useAppParams from '../../hooks/useBoardParams'
import { useAppSelector } from '../../redux/store'
import BoardList from './BoardList'
import ChannelList from './ChannelList'
import { WorkspaceConfig } from '../../redux/slices/workspace.slice'
import GroupList from './GroupList'

export default function Sidebar() {
  const { teamId } = useAppParams()

  const team = useAppSelector(state => state.workspace.blocks[teamId || ''])

  return (
    <div className='flex h-full w-full flex-col border-r  pb-3'>
      <div className='px-4'>
        <div className='flex h-12 items-center'>
          <p className='truncate text-lg font-semibold'>
            {team?.title || 'Personal team'}
          </p>
        </div>

        <div className='flex h-8 w-full items-center rounded bg-slate-100 px-2'>
          <BsSearch className='mr-1 h-4 w-4' />
          <input
            className='flex flex-1 items-center truncate bg-transparent outline-none'
            placeholder='Search...'
          ></input>
        </div>
      </div>

      <div className='relative mt-3 flex-1'>
        <div className='absolute inset-0 overflow-y-auto'>
          {teamId !== WorkspaceConfig.personalTeam && <ChannelList />}
          <BoardList />
          <GroupList />
        </div>
      </div>
    </div>
  )
}
