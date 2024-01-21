import { useState } from 'react'
import { BsChevronRight, BsPlus } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import {
  MessageReferenceType,
  useCreateMessageReferenceMutation
} from '../../graphql/gen-types'
import useAppParams from '../../hooks/useBoardParams'
import { useAppSelector } from '../../redux/store'
import { createPath } from '../../utils'
import IconButton from '../commons/IconButton'

export default function ChannelList() {
  const [expander, setExpander] = useState(true)
  const [createChannel] = useCreateMessageReferenceMutation({})
  const { teamId } = useAppParams()
  const channels =
    useAppSelector(state => {
      return Array.from(
        Object.values(state.workspace.blocks)?.filter(
          e => e.__typename === 'MessageReference' && teamId === e.teamId
        )
      )
    }) || []

  return (
    <div className=''>
      <div className='mx-4 border-t '></div>
      <div className='flex w-full items-center justify-between gap-2 px-4 py-1'>
        <button
          onClick={() => setExpander(!expander)}
          className='relative h-6 flex-1 text-left font-semibold'
        >
          Channels
          {channels.length > 0 && (
            <BsChevronRight
              className={`absolute left-0 top-[50%] translate-x-[-100%] translate-y-[-50%] text-xs opacity-60 transition-transform ${
                expander && 'rotate-90'
              }`}
            />
          )}
        </button>
        <IconButton
          Icon={BsPlus}
          onClick={() => {
            createChannel({
              variables: {
                messageReferenceInput: {
                  messageReferenceType: MessageReferenceType.Channel,
                  title: 'channel của khang',
                  teamId: teamId
                }
              }
            })
          }}
        />
      </div>

      {expander && (
        <div className='flex flex-col gap-1'>
          {channels.map(channel => (
            <NavLink
              key={channel._id}
              className={({
                isActive
              }: {
                isActive: boolean
                isPending: boolean
              }) =>
                `truncate border-l-4 border-transparent py-1 pl-3 pr-4 ${
                  isActive &&
                  '!border-gray-400 bg-gradient-to-r from-gray-200 to-transparent'
                }`
              }
              to={createPath({
                channelId: channel._id,
                teamId
              })}
            >
              {channel.title}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}
