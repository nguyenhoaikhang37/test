import {
  BsBullseye,
  BsCCircleFill,
  BsChatSquareQuote,
  BsFillSignNoRightTurnFill
} from 'react-icons/bs'

export const tabs = [
  {
    icon: BsChatSquareQuote,
    title: 'Channels'
  },
  {
    icon: BsBullseye,
    title: 'Boards'
  }
]

export default function AppHeader() {
  return (
    <div className='flex h-10 items-center justify-between border-b  pl-2 pr-3'>
      <div className='flex items-center gap-3 pl-1 text-base'>
        {/* <p className='text-xl font-semibold'>Simple live board</p> */}

        <BsCCircleFill className='h-8 w-8' />

        <p className='text-xl font-bold'>Simple live board</p>

        {/* {tabs.map(tab => (
          <div className='flex items-center gap-1 rounded bg-slate-400 px-2'>
            <tab.icon></tab.icon>
            {tab.title}
          </div>
        ))} */}
      </div>

      <div className='flex items-center gap-2'>
        <p>Khang</p>
        <BsFillSignNoRightTurnFill className='h-6 w-6' />
      </div>
    </div>
  )
}
