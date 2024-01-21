import { BsInfoLg } from 'react-icons/bs'
import useAppParams from '../../hooks/useBoardParams'
import { useAppSelector } from '../../redux/store'

type TStatus = 'online' | 'offline' | 'unknown'

export const MessageItem = ({ status = 'unknown' }: { status?: TStatus }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'offline':
        return 'bg-gray-200'
      case 'online':
        return 'bg-yellow-400'
      default:
        return 'bg-white'
    }
  }

  const statusColor = getStatusColor()

  return (
    <>
      <div className='mt-4 flex w-full gap-1'>
        <div className='relative h-8 w-8 rounded-full bg-slate-700'>
          <div
            className={`absolute bottom-[-1px] right-[-1px] h-3 w-3 rounded-full border border-gray-300 ${statusColor}`}
          ></div>
        </div>
        <div className='flex flex-1 flex-col items-start gap-1'>
          <div>
            <p className='font-semibold leading-4'>Nguyễn Đức Khang</p>
            <p className='text-xs leading-4 text-gray-500'>@Senytera</p>
          </div>

          <p className='rounded bg-gray-100 p-1'>
            Test tính năng gì đó đi bro ơi tính năng gì đó đi bro ơi tính năng
            gì đó đi broính năng gì đó đi bro ơi tính năng gì đó đi bro ơi tính
            năng gì đó đi broính năng gì đó đi bro ơi tính năng gì đó đi bro ơi
            tính năng gì đó đi bro
          </p>
          <p className='rounded bg-gray-100 p-1'>
            Test tính năng gì đó đi bro ơi bro
          </p>
          <p className='rounded bg-gray-100 p-1'>
            ơi tính năng gì đó đi bro ơi tính năng gì đó đi bro ơi tính năng gì
            đó đi bro ơi bro
          </p>
        </div>
      </div>

      <div className='mt-3 flex w-full flex-row-reverse gap-1'>
        <div className='relative h-8 w-8 rounded-full bg-slate-700'>
          <div
            className={`absolute bottom-[-1px] right-[-1px] h-3 w-3 rounded-full border border-gray-300 ${statusColor}`}
          ></div>
        </div>
        <div className='flex flex-1 flex-col items-end gap-1'>
          <div className='flex flex-col items-end'>
            <p className='font-semibold leading-4'>Nguyễn Đức Khang</p>
            <p className='text-xs leading-4 text-gray-500'>@Senytera</p>
          </div>
          <p className='rounded bg-gray-100 p-1'>
            Test tính năng gì đó đi bro ơi tính năng gì đó đi bro ơi tính năng
            gì đó đi bro
          </p>
          <p className='rounded bg-gray-100 p-1'>
            Test tính năng gì đó đi bro ơi bro broính năng gì đó đi bro ơi tính
            năng gì đó đi bro ơi tính năng gì đó đi broính năng gì đó đi bro ơi
            tính năng gì đó đi bro ơi tính năng gì đó đi bro broính năng gì đó
            đi bro ơi tính năng gì đó đi bro ơi tính năng gì đó đi broính năng
            gì đó đi bro ơi tính năng gì đó đi bro ơi tính năng gì đó đi bro
          </p>
          <p className='rounded bg-gray-100 p-1'>
            ơi tính năng gì đó đi bro ơi tính năng gì đó đi bro ơi tính năng gì
            đó đi bro ơi bro
          </p>
        </div>
      </div>
    </>
  )
}

export default function MessageArea() {
  const { messageId, channelId, groupId } = useAppParams()

  const messRef = useAppSelector(
    state => state.workspace.blocks[messageId || channelId || groupId || '']
  )

  return (
    <>
      <div className='flex h-12 items-center border-b px-3'>
        <p className='flex-1 text-base font-semibold'>{messRef?.title}</p>

        <button className='flex h-6 w-6 items-center justify-center rounded bg-gray-100 hover:bg-gray-300 hover:ring-1'>
          <BsInfoLg className='h-4 w-4' />
        </button>
      </div>
      <div className='relative flex-1'>
        <div className='absolute inset-0 overflow-y-auto px-3'>
          {Array(10)
            .fill(1)
            .map(e => (
              <MessageItem />
            ))}
        </div>
      </div>
      <div className='min-h-[80px] bg-slate-100 p-3'>Create Mess</div>
    </>
  )
}
