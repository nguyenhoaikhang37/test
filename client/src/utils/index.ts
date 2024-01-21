import _ from 'lodash'
import { TParams } from '../hooks/useBoardParams'

type FilterCallback<T> = (element: Partial<T>) => any

export const arrayUtils = {
  moveElementToIndex: <T>(
    arr: T[],
    value: Partial<T>,
    index: number,
    filterCallback?: FilterCallback<T>
  ) => {
    const currentValue = filterCallback ? filterCallback(value) : value
    const currentIndex = arr.findIndex(element =>
      filterCallback
        ? filterCallback(element) === currentValue
        : element === currentValue
    )
    if (currentIndex !== -1) {
      arr.splice(index, 0, arr.splice(currentIndex, 1)[0])
    }
    return arr
  },

  removeElement: <T>(
    arr: T[],
    value: Partial<T>,
    filterCallback?: FilterCallback<T>
  ) => {
    const currentValue = filterCallback ? filterCallback(value) : value
    const index = arr.findIndex(element =>
      filterCallback
        ? filterCallback(element) === currentValue
        : element === currentValue
    )
    if (index !== -1) {
      arr.splice(index, 1)
    }
    return arr
  },

  insertElementAtIndex: <T>(arr: T[], value: T, index: number) => {
    arr.splice(index, 0, value)
    return arr
  }
}

export const cleanObj = <T extends object>(obj: T) => _.omitBy(obj, _.isNil)

export const createPath = ({
  boardId,
  channelId,
  groupId,
  teamId,
  messageId
}: Partial<TParams>) => {
  if (boardId) return `/team/${teamId}/board/${boardId}`
  if (channelId) return `/team/${teamId}/channel/${channelId}`
  if (groupId) return `/team/${teamId}/group/${groupId}`
  if (messageId) return `/team/${teamId}/message/${messageId}`

  return `/team/${teamId}`
}
