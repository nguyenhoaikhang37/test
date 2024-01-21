import { Draggable, Droppable } from 'react-beautiful-dnd'

import { useAppSelector } from '../../../redux/store'
import Card from './card/Card'

type Props = {
  columnId: string
}
export default function Column({ columnId }: Props) {
  const cardsId = useAppSelector(state => {
    const column = state.board.blocks[columnId]
    if (column.__typename === 'Column') return column.cardsId
  })

  return (
    <Droppable droppableId={columnId} direction='vertical' type='card'>
      {provided => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {cardsId?.map((cardId, index) => {
            return (
              <Draggable key={cardId} draggableId={cardId} index={index}>
                {provided => (
                  <div {...provided.draggableProps} ref={provided.innerRef}>
                    <div {...provided.dragHandleProps} className='py-1'>
                      <Card cardId={cardId} />
                    </div>
                  </div>
                )}
              </Draggable>
            )
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
