import { useCallback } from 'react'
import { OnDragEndResponder } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import {
  useUpdateCardPositionMutation,
  useUpdateColumnPositionMutation
} from '../../graphql/gen-types'
import { boardActions } from '../../redux/slices/board.slice'
import { useAppSelector } from '../../redux/store'

export default function useUpdatePosition() {
  const dispatch = useDispatch()
  const [updateColumnPosition] = useUpdateColumnPositionMutation()
  const [updateCardPosition] = useUpdateCardPositionMutation()

  const boardId = useAppSelector(state => state.board.boardId)

  const onDragEnd: OnDragEndResponder = useCallback(
    (result, provided) => {
      const { destination, source, draggableId, type } = result
      if (!destination) {
        return
      }

      console.log(result)

      if (type === 'column') {
        dispatch(
          boardActions.changeColumnPosition({
            toPosition: destination.index,
            columnId: draggableId
          })
        )

        updateColumnPosition({
          variables: {
            boardId: boardId!,
            columnId: draggableId,
            toPosition: destination.index
          }
        })
      }

      if (type === 'card') {
        dispatch(
          boardActions.changeCardPosition({
            cardId: draggableId,
            fromColumnId: source.droppableId,
            toColumnId: destination.droppableId,
            toPosition: destination.index
          })
        )

        updateCardPosition({
          variables: {
            cardId: draggableId,
            fromColumnId: source.droppableId,
            toColumnId: destination.droppableId,
            toPosition: destination.index
          }
        })
      }
    },
    [dispatch, updateColumnPosition, updateCardPosition, boardId]
  )

  return onDragEnd
}
