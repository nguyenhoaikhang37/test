type FilterCallback<T> = (element: Partial<T>) => any

export const arrayUtils = {
  moveElementToIndex: <T>(
    arr: T[],
    value: Partial<T>,
    index: number,
    filterCallback?: FilterCallback<T>
  ) => {
    const newArr = arr.slice()
    const currentValue = filterCallback ? filterCallback(value) : value
    const currentIndex = newArr.findIndex(element =>
      filterCallback
        ? filterCallback(element) == currentValue
        : (element = currentValue)
    )
    if (currentIndex != -1) {
      newArr.splice(index, 0, newArr.splice(currentIndex, 1)[0])
    }
    return newArr
  },

  removeElement: <T>(
    arr: T[],
    value: Partial<T>,
    filterCallback?: FilterCallback<T>
  ) => {
    const newArr = arr.slice()
    const currentValue = filterCallback ? filterCallback(value) : value
    return newArr.filter(element =>
      filterCallback
        ? filterCallback(element) != currentValue
        : element != currentValue
    )
  },

  removeDuplicates: <T>(arr?: T[]): T[] => (arr ? [...new Set(arr)] : []),

  insertElementAtIndex: <T>(arr: T[], value: T, index: number) => {
    const newArr = arr.slice()
    newArr.splice(index, 0, value)
    return newArr
  }
}

export const getUserIdFromContext = (context: any) =>
  context.req.user.userId as string

// export const cleanObj = <T extends object>(obj: T) => _.omitBy(obj, _.isNil)
export const cleanObj = <T extends object>(obj: T): Partial<T> => {
  const cleanedObj: Partial<T> = {}

  for (const key in obj) {
    const value = obj[key]

    if (value != null && value != undefined) {
      if (typeof value == 'object') {
        const cleanedValue = cleanObj(value)
        if (Object.keys(cleanedValue).length > 0) {
          ;(cleanedObj as any)[key] = cleanedValue
        }
      } else {
        cleanedObj[key] = value
      }
    }
  }

  return cleanedObj
}
