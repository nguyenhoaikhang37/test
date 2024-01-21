import { Board, BoardDataBlockUnion } from '../graphql/gen-types'
import { useAppSelector } from '../redux/store'

export function useBlocks<T>(
  rootId: string,
  type: Exclude<BoardDataBlockUnion['__typename'], 'Board'>,
  cb?: (block: BoardDataBlockUnion) => T
) {
  const blocks = useAppSelector(state => {
    const blocks = state.board.blocks

    const arr: Exclude<BoardDataBlockUnion, Board>[] = []
    for (const key in blocks) {
      if (blocks.hasOwnProperty(key)) {
        const value = blocks[key]

        if (
          value.__typename === type &&
          ((value as any)?.parentId === rootId ||
            (value as any)?.ancestorPath.includes(rootId))
        ) {
          arr.push(value as any)
        }
      }
    }

    arr.sort((a, b) => {
      const createAtA = new Date(a.createdAt).getTime()
      const createAtB = new Date(b.createdAt).getTime()
      return createAtA - createAtB
    })

    return cb ? arr.map(e => cb(e)) : arr
  })

  return blocks || []
}
