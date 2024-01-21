import { useCreateColumnMutation } from '../../../graphql/gen-types'
import useAppParams from '../../../hooks/useBoardParams'

export default function CreateColumn() {
  const [createColumn] = useCreateColumnMutation()
  const { boardId } = useAppParams()
  return (
    <div className='w-64 rounded bg-slate-100 p-3'>
      <div
        className='bg-red-500'
        onClick={() => {
          if (boardId)
            createColumn({
              variables: {
                boardId,
                columnInput: {
                  title: 'tesstttttt'
                }
              }
            })
        }}
      >
        Create
      </div>
    </div>
  )
}
