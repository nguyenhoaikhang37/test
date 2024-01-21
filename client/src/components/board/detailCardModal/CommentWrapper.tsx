import { Comment as TComment } from '../../../graphql/gen-types'
import { useComments } from '../../../hooks/useComments'
import Comment from './Comment'
import CreateComment from './CreateComment'

export default function CommentWrapper({ cardId }: { cardId: string }) {
  const comments = useComments(cardId) as TComment[]

  return (
    <div className='flex flex-1 flex-col gap-3'>
      <div className='relative flex-1'>
        <div className='absolute inset-0 flex flex-1 flex-col gap-3 overflow-y-auto px-5'>
          {comments.map((cmt, index) => (
            <Comment
              key={cmt._id}
              comment={cmt}
              isDrowLine={index < comments.length - 1}
            />
          ))}
        </div>
      </div>

      <CreateComment />
    </div>
  )
}
