import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Board } from '../../graphql/gen-types'
import { useAppSelector } from '../../redux/store'
import CardDetailModal from './CardDetailModal'
import Column from './column/VitrualCol'
import ColumnHeader from './column/ColumnHeader'
import CreateColumn from './column/CreateColumn'
import useUpdatePosition from './useUpdatePosition'

const BoardDetail = () => {
  const onDragEnd = useUpdatePosition()

  const board = useAppSelector(
    state => state.board.blocks[state.board.boardId] as Board
  )

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable' direction='horizontal' type='column'>
          {provided => (
            <div
              className='flex p-2'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {board?.columnsId?.map((itemId, index) => {
                return (
                  <Draggable key={itemId} draggableId={itemId} index={index}>
                    {provided => (
                      <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className='rounded-md p-2'
                      >
                        <div className='min-w-[294px] rounded bg-slate-100 pb-2 pt-3'>
                          <div className='px-3'>
                            <ColumnHeader
                              columnId={itemId}
                              dragHandleProps={provided.dragHandleProps}
                            />
                          </div>

                          <div className='px-3'>
                            <Column columnId={itemId} />
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                )
              })}

              {provided.placeholder}

              <div className='rounded-md p-2 '>
                <CreateColumn />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <CardDetailModal />
    </>
  )
}

export default BoardDetail
