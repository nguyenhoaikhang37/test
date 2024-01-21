import { memo } from 'react'
import { BsChatDots, BsPaperclip } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { Card } from '../../../../graphql/gen-types'
import { useCommentCount } from '../../../../hooks/useComments'
import { boardActions } from '../../../../redux/slices/board.slice'
import { useAppSelector } from '../../../../redux/store'
import { CheckStatistic } from '../../detailCardModal/SubTask'

const LabelTag = () => {
  return (
    <div className='flex h-6 w-fit items-center gap-1 rounded bg-slate-200 p-0.5'>
      <p>Mobile</p>
    </div>
  )
}

type Props = {
  cardId: string
}
const Card = ({ cardId }: Props) => {
  const dispatch = useDispatch()
  const card = useAppSelector(state => state.board.blocks[cardId] as Card)
  const commentCount = useCommentCount(cardId)

  return (
    <div
      className='flex h-full w-full flex-col gap-1.5 rounded-md border  bg-white p-3 text-sm'
      onClick={() => {
        dispatch(boardActions.toggleCard(cardId))
      }}
    >
      <div className='flex gap-2'>
        <LabelTag />
        <LabelTag />
        <LabelTag />
      </div>

      <p className='line-clamp-2 w-full flex-1 text-sm font-semibold'>
        {card?.title}
      </p>

      <div className='flex items-center gap-3'>
        <div className='flex flex-1'>
          <div className='flex h-6 w-6 items-center justify-center rounded-full border border-white bg-slate-500 text-white'>
            A
          </div>
          <div className='flex h-6 w-6 translate-x-[-30%] items-center justify-center rounded-full border border-white bg-slate-500 text-white'>
            B
          </div>
          <div className='flex h-6 w-6 translate-x-[-60%] items-center justify-center rounded-full border border-white bg-slate-500 text-white'>
            C
          </div>
          <div className='flex h-6 w-6 translate-x-[-90%] items-center justify-center rounded-full border border-white bg-slate-500 text-white'>
            +3
          </div>
        </div>

        <div className='flex items-center gap-1'>
          <BsPaperclip /> 3
        </div>

        {commentCount > 0 && (
          <div className='flex items-center gap-1'>
            <BsChatDots /> {commentCount}
          </div>
        )}

        <CheckStatistic cardId={cardId} />
      </div>
    </div>
  )
}

export default memo(Card)
