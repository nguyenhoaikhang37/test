import {
  Draggable,
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot
} from 'react-beautiful-dnd'

import React, { memo } from 'react'
import { FixedSizeList as List, areEqual } from 'react-window'
import { useAppSelector } from '../../../redux/store'
import Card from './card/Card'

type Props = {
  columnId: string
}

const Row = memo(
  ({
    data: cardsId,
    index,
    style
  }: {
    index: number
    style: React.CSSProperties
    data: string[]
  }) => {
    const cardId = cardsId[index]

    // Điều chỉnh CSS của phần tử dựa trên isDraggingOver
    const patchedStyle = {
      ...style,
      transition: 'transform 0.2s ease' // Áp dụng transition
    }

    return (
      <Draggable draggableId={cardId} index={index} key={cardId}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={patchedStyle}
          >
            <Card cardId={cardId} />
          </div>
        )}
      </Draggable>
    )
  },
  areEqual
)

export default function Column({ columnId }: Props) {
  const cardsId =
    useAppSelector(state => {
      const column = state.board.blocks[columnId]
      if (column.__typename === 'Column') return column.cardsId
    }) || []

  return (
    <Droppable
      droppableId={columnId}
      direction='vertical'
      type='card'
      renderClone={(
        provided: DraggableProvided,
        snapshot: DraggableStateSnapshot,
        rubric: DraggableRubric
      ) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card cardId={cardsId[rubric.source.index]} />
        </div>
      )}
    >
      {(
        droppableProvided: DroppableProvided,
        snapshot: DroppableStateSnapshot
      ) => {
        const itemCount: number = snapshot.isUsingPlaceholder
          ? cardsId.length + 1
          : cardsId.length

        return (
          <List
            height={500}
            itemCount={itemCount}
            itemSize={136}
            width={'100%'}
            outerRef={droppableProvided.innerRef}
            itemData={cardsId}
          >
            {({ index, style }) => {
              return <Row data={cardsId} index={index} style={style} />
            }}
          </List>
        )
      }}
    </Droppable>
  )
}
