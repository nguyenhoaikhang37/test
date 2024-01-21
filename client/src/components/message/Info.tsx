import { BsChevronRight } from 'react-icons/bs'

type TStatus = 'online' | 'offline' | 'unknown'

export const UserInfo = ({ status = 'unknown' }: { status?: TStatus }) => {
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
    <div className='flex w-full items-center gap-1 rounded-md p-1 hover:bg-gray-300'>
      <div className='relative h-8 w-8 rounded-full bg-slate-700'>
        <div
          className={`absolute bottom-[-1px] right-[-1px] h-3 w-3 rounded-full border border-gray-300 ${statusColor}`}
        ></div>
      </div>
      <div className='flex flex-1 flex-col justify-center'>
        <p className='leading-4'>Nguyễn Đức Khang</p>
        <p className='text-xs leading-4 text-gray-500'>@Senytera</p>
      </div>
    </div>
  )
}

export default function Info() {
  return (
    <>
      <div className='flex flex-col gap-2 p-3 pb-0 pt-1'>
        <div>
          <p className='text-base font-semibold'>Channel của khang</p>
          <p className='text-xs text-gray-500'>Id: 64b49a6933cdc836f4f1f9ec</p>
        </div>

        <div>
          <div className='group relative flex cursor-pointer items-center gap-1 from-gray-200 to-transparent py-1 hover:bg-gradient-to-r'>
            {/* <BsPersonGear /> */}
            <p className='flex-1'>Members</p>
            <p className='text-xs'>99+</p>
            <BsChevronRight />
            <div className='invisible absolute bottom-0 left-[-12px] top-0 w-1 bg-gray-400 group-hover:visible' />
          </div>

          <div className='group relative flex cursor-pointer items-center gap-1 from-gray-200 to-transparent py-1 hover:bg-gradient-to-r'>
            {/* <BsFiles /> */}
            <p className='flex-1'>Files</p>
            <p className='text-xs'>99+</p>
            <BsChevronRight />
            <div className='invisible absolute bottom-0 left-[-12px] top-0 w-1 bg-gray-400 group-hover:visible' />
          </div>

          <div className='group relative flex cursor-pointer items-center gap-1 from-gray-200 to-transparent py-1 hover:bg-gradient-to-r'>
            {/* <BsFillPinAngleFill /> */}
            <p className='flex-1'>Pinned messages</p>
            <p className='text-xs'>2</p>
            <BsChevronRight />
            <div className='invisible absolute bottom-0 left-[-12px] top-0 w-1 bg-gray-400 group-hover:visible' />
          </div>

          <div className='group relative flex cursor-pointer items-center gap-1 from-gray-200 to-transparent py-1 hover:bg-gradient-to-r'>
            {/* <BsFillGearFill /> */}
            <p className='flex-1'>Setting</p>
            <div className='invisible absolute bottom-0 left-[-12px] top-0 w-1 bg-gray-400 group-hover:visible' />
          </div>
        </div>

        <input
          placeholder='Find on team channel'
          className='w-full rounded bg-gray-50 px-3 py-2 outline-none hover:ring-1 focus:ring-1'
        />

        <div className='border-t'></div>
      </div>
      <div className='relative flex-1'>
        <div className='absolute inset-0 overflow-y-auto p-3 pt-0'>
          <div className='mt-2'>
            <p className=''>Team Admin</p>
            {Array(2)
              .fill(1)
              .map((_, index) => (
                <UserInfo key={index} />
              ))}
          </div>
          <div className='mt-2'>
            <p className=''>Channel Admin</p>
            {Array(3)
              .fill(1)
              .map((_, index) => (
                <UserInfo key={index} />
              ))}
          </div>
          <div className='mt-2'>
            <p className=''>Member</p>
            {Array(100)
              .fill(1)
              .map((_, index) => (
                <UserInfo key={index} status='online' />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
