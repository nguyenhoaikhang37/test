import { BoardVirtural } from '../dndVirtural/Board'
import BoardAsyncService from './BoardAsyncService'
import CardDetailModal from './CardDetailModal'
import BoardFilter from './filter/BoardFilter'

export default function BoardContent() {
  return (
    <>
      <BoardFilter />
      <div className='relative flex-1'>
        <div
          className='absolute bottom-0 left-1 right-3 top-0 flex overflow-x-auto pb-3'
          id='boardContentId'
        >
          <BoardVirtural />
        </div>
      </div>
      <CardDetailModal />
      <BoardAsyncService />
    </>
  )
}
