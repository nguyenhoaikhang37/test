import Info from './Info'
import MessageArea from './MessageArea'

export default function MessageContent() {
  return (
    <div className='flex h-full w-full'>
      <div className='flex flex-1 flex-col'>
        <MessageArea />
      </div>

      <div className='flex w-2/6 flex-col border-l'>
        <Info />
      </div>
    </div>
  )
}
