import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  BoardDataBlockUnion,
  useBlocksUpdatedSubscription,
  useGetFlatBoardQuery
} from '../graphql/gen-types'
import { Blocks, boardActions } from '../redux/slices/board.slice'
import useAppParams from './useBoardParams'

export default function useAsyncBoard() {
  const { boardId } = useAppParams()
  const dispatch = useDispatch()

  const { loading } = useGetFlatBoardQuery({
    skip: !boardId,
    variables: {
      boardId: boardId!
    },
    onCompleted(data) {
      if (data.flatBoard)
        dispatch(
          boardActions.initBoard({
            boardId: boardId!,
            loading: false,
            blocks: data.flatBoard.reduce(
              (pre, next) => ({ ...pre, [next._id]: next as any }),
              {} as Blocks
            )
          })
        )
    },
    onError() {
      dispatch(boardActions.resetBoard())
    },

    fetchPolicy: 'no-cache'
  })

  useBlocksUpdatedSubscription({
    skip: !boardId,
    variables: {
      rootId: boardId!
    },

    onData(data) {
      console.log(data)
      dispatch(
        boardActions.boardUpdated(
          (data.data.data?.boardDatablocksUpdated as BoardDataBlockUnion[]) ||
            []
        )
      )
    }
  })

  useEffect(() => {
    dispatch(boardActions.setLoading(loading))
  }, [loading, dispatch])

  return true
}
