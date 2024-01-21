import { useState } from 'react'
import { BsFillSendFill, BsX } from 'react-icons/bs'
import { CommentTo, useCreateCommentMutation } from '../../../graphql/gen-types'
import Input from '../../commons/Input'

export default function ReplyComment({ parentId }: { parentId: string }) {
  const [value, setValue] = useState('')
  const [createComment, { loading }] = useCreateCommentMutation({
    onCompleted() {
      setValue('')
    }
  })

  return (
    <div className='mt-1 flex items-center justify-end gap-3'>
      <Input
        className='h-8 flex-1 rounded-none border-b outline-none hover:border-blue-400 focus:border-blue-400'
        placeholder='Comment'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button
        onClick={() => {
          if (value && !loading && parentId) {
            createComment({
              variables: {
                input: {
                  commentTo: CommentTo.Comment,
                  content: value
                },
                parentId
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
