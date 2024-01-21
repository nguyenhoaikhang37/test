import { useEffect, useState } from 'react'
import { RootState, useAppSelector } from '../../redux/store'
import { cleanObj } from '../../utils'

type TPattern = {
  regex: RegExp
  message: string
}

type TController<T> = {
  watching: [(state: RootState) => T, T]
  patterns?: T extends string ? TPattern[] : never
  children: ({
    onChange,
    value,
    error,
    onSubmit
  }: {
    value: T
    onChange: (value: T) => void
    error: string | null
    onSubmit: () => void
  }) => any

  onSubmit?: (data: T) => void
}

const _cleanObj = (obj: any) => {
  return JSON.parse(JSON.stringify(cleanObj(obj)))
}

export default function Controller<T>({
  watching,
  patterns,
  children,
  onSubmit
}: TController<T>) {
  // const [watchingSelector, defaultValue] = watching

  const defaultValue = watching[1]

  const data = useAppSelector(...watching) || ''
  const [draft, setDraft] = useState<T>(defaultValue)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    data && setDraft(data)
    setError(null)
  }, [data])

  const handleValueChange = (value: T) => {
    setDraft(value)
    setError(null)
  }

  const handleSubmit = () => {
    const isValid = validatePatterns(draft!)

    const isChange = hasValueChanged()
    if (isValid && isChange) {
      onSubmit && onSubmit(draft!)
    }
  }

  const validatePatterns = (value: T): boolean => {
    if (typeof value === 'string' && patterns) {
      for (const pattern of patterns) {
        const { regex, message } = pattern
        if (!regex.test(value.toString())) {
          setError(message)
          return false
        }
      }
    }
    return true
  }

  const hasValueChanged = () => {
    const normalizedDraft = _cleanObj(draft)
    const normalizedData = _cleanObj(data)
    return JSON.stringify(normalizedDraft) !== JSON.stringify(normalizedData)
  }

  return children({
    value: draft!,
    onChange: handleValueChange,
    error,
    onSubmit: handleSubmit
  })
}

// const _TestComponent = () => {
//   return (
//     <Controller
//       watching={[state => state.board.cards['cardId'].title, '']}
//       patterns={[{ regex: /^[\w\s]+$/, message: 'Invalid title' }]}
//       onSubmit={data => {
//         console.log(data)
//       }}
//     >
//       {({ value, onChange, error, onSubmit }) => (
//         <>
//           <input
//             value={value}
//             onChange={e => onChange(e.target.value)}
//             onBlur={onSubmit}
//           />
//           {error && <span>{error}</span>}
//         </>
//       )}
//     </Controller>
//   )
// }
