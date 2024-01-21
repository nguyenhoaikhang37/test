import { Comment as TComment } from '../../../graphql/gen-types'
import ReplyComment from './ReplyComment'
import { useDispatch } from 'react-redux'
import { useComments } from '../../../hooks/useComments'
import { boardActions } from '../../../redux/slices/board.slice'
import { useAppSelector } from '../../../redux/store'

export default function Comment({
  comment,
  isDrowLine
}: {
  comment: TComment
  isDrowLine?: boolean
}) {
  const replyComments = useComments(comment._id) as TComment[]
  const replyId = useAppSelector(state => state.board.replyCommentId)
  const dispatch = useDispatch()
  return (
    <div className='flex gap-3'>
      <div className='flex flex-col items-center gap-2'>
        <div className='h-8 w-8 rounded-full bg-slate-300'></div>
        {isDrowLine && <div className='w-[1px] flex-1 bg-gray-300'></div>}
      </div>
      <div className='flex-1'>
        <div className='flex items-center gap-3'>
          <p className='font-semibold'>Senytera</p>
          <div className='h-3 w-[1px] bg-black' />
          <p className='text-sm'>{comment.createdAt}</p>
        </div>

        <div className='group relative'>
          <p
            className='w-fit cursor-pointer break-all rounded bg-slate-100 py-1 px-2 text-sm'
            onClick={() =>
              dispatch(boardActions.toggleReplyComment(comment._id))
            }
          >
            {comment.content}
          </p>
        </div>

        {replyComments.map((e, index) => (
          <div className='mt-1' key={e._id}>
            <Comment
              comment={e}
              isDrowLine={index < replyComments.length - 1}
            />
          </div>
        ))}

        {replyId === comment._id && <ReplyComment parentId={comment._id} />}
      </div>
    </div>
  )
}
