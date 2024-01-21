import React, { useLayoutEffect, useRef } from 'react'
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable
} from 'react-beautiful-dnd'
import { FixedSizeList, areEqual } from 'react-window'
import { Board, Column, useCreateColumnMutation } from '../../graphql/gen-types'
import { useAppSelector } from '../../redux/store'
import ColumnHeader from '../board/column/ColumnHeader'
import Card from '../board/column/card/Card'
import useUpdatePosition from '../board/useUpdatePosition'
import './style.css'
import useColumnHeight from './useColumnHeight'

function getStyle({ draggableStyle, virtualStyle, isDragging }: any) {
  const combined = {
    ...virtualStyle,
    ...draggableStyle
  }
  const grid = 8
  const result = {
    ...combined,
    height: isDragging ? combined.height : combined.height,
    left: isDragging ? combined.left : combined.left + grid,
    width: isDragging
      ? draggableStyle.width
      : `calc(${combined.width} - ${grid * 2}px)`
  }

  return result
}

function Item({
  provided,
  cardId,
  style,
  isDragging
}: {
  style?: React.CSSProperties
  cardId: string
  provided: DraggableProvided
  isDragging?: boolean
}) {
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      style={getStyle({
        draggableStyle: provided.draggableProps.style,
        virtualStyle: style,
        isDragging
      })}
      className={`${
        isDragging ? 'is-dragging' : ''
      } overflow-hidden py-1 first:pt-0 last:pb-0`}
    >
      <Card cardId={cardId} />
    </div>
  )
}

const Row = React.memo(function Row(props: {
  index: number
  data: string[]
  style?: React.CSSProperties
}) {
  const { data: cardsId, index, style } = props
  const cardId = cardsId[index]

  if (!cardId) {
    return null
  }

  return (
    <Draggable draggableId={cardId} index={index} key={cardId}>
      {provided => <Item provided={provided} cardId={cardId} style={style} />}
    </Draggable>
  )
},
areEqual)

const ItemList = React.memo(
  ({ columnId, index }: { columnId: string; index: number }) => {
    const cardsId =
      useAppSelector(
        state => (state.board.blocks[columnId] as Column).cardsId
      ) || []

    const columnHeight = useColumnHeight()

    const listRef: any = useRef()
    useLayoutEffect(() => {
      const list = listRef.current
      if (list) {
        list.scrollTo(0)
      }
    }, [index])

    return (
      <Droppable
        droppableId={columnId}
        mode='virtual'
        type='card'
        renderClone={(provided, snapshot, rubric) => (
          <Item
            provided={provided}
            isDragging={snapshot.isDragging}
            cardId={cardsId[rubric.source.index]}
          />
        )}
      >
        {(provided, snapshot) => {
          const itemCount = snapshot.isUsingPlaceholder
            ? cardsId.length + 1
            : cardsId.length

          return (
            <FixedSizeList
              height={columnHeight - 56}
              itemCount={itemCount}
              itemSize={132}
              width={280}
              outerRef={provided.innerRef}
              itemData={cardsId}
              className='task-list'
              ref={listRef}
            >
              {Row}
            </FixedSizeList>
          )
        }}
      </Droppable>
    )
  }
)

const Column = React.memo(function Column({
  columnId,
  index
}: {
  columnId: string
  index: number
}) {
  return (
    <Draggable draggableId={columnId} index={index}>
      {provided => (
        <div
          className='mx-2 rounded bg-slate-100'
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className='px-2 py-1' {...provided.dragHandleProps}>
            <ColumnHeader columnId={columnId} />
          </div>
          <div className='pb-3'>
            <ItemList columnId={columnId} index={index} />
          </div>
        </div>
      )}
    </Draggable>
  )
})

export function BoardVirtural() {
  const board = useAppSelector(
    state => state.board.blocks[state.board.boardId] as Board
  )
  const loading = useAppSelector(state => state.board.loading)

  const onDragEnd = useUpdatePosition()

  const [createColumn] = useCreateColumnMutation()

  if (loading)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        Loading
      </div>
    )

  if (!board)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        Board not found
      </div>
    )

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId='all-droppables'
          direction='horizontal'
          type='column'
        >
          {provided => (
            <div
              className='flex'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {board.columnsId.map((columnId, index) => (
                <Column key={columnId} columnId={columnId} index={index} />
              ))}

              {provided.placeholder}

              <div
                className='mx-2 flex h-8 items-center rounded bg-slate-100 px-3 py-1 text-base'
                style={{ width: '280px' }}
                onClick={() =>
                  createColumn({
                    variables: {
                      boardId: board._id,
                      columnInput: {
                        title: 'Column' + Math.random()
                      }
                    }
                  })
                }
              >
                Create column
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
