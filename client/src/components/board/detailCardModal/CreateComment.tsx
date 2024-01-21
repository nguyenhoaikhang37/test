import { useState } from 'react'
import { CommentTo, useCreateCommentMutation } from '../../../graphql/gen-types'
import { useAppSelector } from '../../../redux/store'
import Input from '../../commons/Input'
import { BsFillSendFill } from 'react-icons/bs'

export default function CreateComment() {
  const [value, setValue] = useState('')
  const [createComment, { loading }] = useCreateCommentMutation({
    onCompleted() {
      setValue('')
    }
  })
  const cardId = useAppSelector(state => state.board.cardOpenId)

  return (
    <div className='flex items-center justify-end gap-3 px-5'>
      <Input
        className='h-8 flex-1 rounded-none border-b outline-none hover:border-blue-400 focus:border-blue-400'
        placeholder='Comment'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button
        onClick={() => {
          if (value && !loading && cardId) {
            createComment({
              variables: {
                input: {
                  commentTo: CommentTo.Card,
                  content: value
                },
                parentId: cardId
              }
            })
          }
        }}
        className='flex transform items-center justify-center rounded-lg bg-gray-800 px-2 py-2 text-white hover:ring-1'
      >
        <BsFillSendFill />
      </button>
    </div>
  )
}
