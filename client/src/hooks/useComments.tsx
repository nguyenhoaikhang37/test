import { Comment } from '../graphql/gen-types'
import { useAppSelector } from '../redux/store'

export function useComments<T>(parentId: string, cb?: (comment: Comment) => T) {
  const comments = useAppSelector(state => {
    const blocks = state.board.blocks

    const arr: Comment[] = []
    for (const key in blocks) {
      if (blocks.hasOwnProperty(key)) {
        const value = blocks[key]

        if (value.__typename === 'Comment' && value.parentId === parentId) {
          arr.push(value)
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

  return comments || []
}

export function useCommentCount(parentId: string) {
  const commentCount = useAppSelector(state => {
    const blocks = state.board.blocks

    const arr: Comment[] = []
    for (const key in blocks) {
      if (blocks.hasOwnProperty(key)) {
        const value = blocks[key]

        if (
          value.__typename === 'Comment' &&
          value.ancestorPath.includes(parentId)
        ) {
          arr.push(value)
        }
      }
    }

    return arr.length
  })

  return commentCount || 0
}
