import {
  Board,
  Card,
  FieldType,
  useAddBoardFieldMutation,
  useUpdateCardMutation
} from '../../../graphql/gen-types'
import { useAppSelector } from '../../../redux/store'
import DatePickerField from './fieldType/DatePickerField'
import PeopleSelect from './fieldType/PeopleSelect'
import SelectField from './fieldType/SelectField'

export type FieldsData = {
  [key: string]: string | string[] | number | Date | undefined
}

export default function FieldWrapper({ cardId }: { cardId: string }) {
  const properties = useAppSelector(
    state => (state.board.blocks[state.board.boardId] as Board).properties
  )
  const boardId = useAppSelector(state => state.board.boardId)
  const fieldsData = useAppSelector(
    state => (state.board.blocks[cardId] as Card).fieldsData as FieldsData
  )

  const [createProperty] = useAddBoardFieldMutation()

  const [updateCardMutation] = useUpdateCardMutation({
    onCompleted(data) {
      console.log(data)
    }
  })

  const updateCard = (_fieldsData: FieldsData) => {
    updateCardMutation({
      variables: {
        cardId,
        cardInput: {
          fieldsData: { ...fieldsData, ..._fieldsData }
        }
      }
    })
  }

  return (
    <div className='flex flex-col gap-1 px-5'>
      {properties?.map(e => (
        <div key={e._id} className='flex items-center gap-3'>
          <p className='w-24'>{e.title}</p>
          <div className='flex-1'>
            {e.fieldType === FieldType.Date && (
              <DatePickerField
                keyId={e._id}
                value={fieldsData && (fieldsData[e._id] as Date)}
                onChange={date => {
                  updateCard({
                    [e._id]: date
                  })
                }}
              />
            )}
            {e.fieldType === FieldType.MultiPeople && <PeopleSelect />}

            {e.fieldType === FieldType.MultiSelect && (
              <SelectField
                onChange={selected => {
                  console.log('selected', selected)
                  updateCard({
                    [e._id]: selected
                  })
                }}
                options={e.fieldOption || []}
                selected={(fieldsData && (fieldsData[e._id] as string[])) || []}
              />
            )}
          </div>
        </div>
      ))}

      <div
        className='flex h-6 w-fit items-center justify-center rounded bg-slate-200 px-2'
        onClick={() => {
          if (boardId)
            createProperty({
              variables: {
                boardId,
                fieldInput: {
                  fieldType: FieldType.MultiSelect,
                  title: 'MultiSelect',
                  fieldOption: [
                    {
                      color: '#aaa',
                      title: 'Select 1'
                    },
                    {
                      color: '#bbb',
                      title: 'Select 2'
                    },
                    {
                      color: '#ccc',
                      title: 'Select 3'
                    },
                    {
                      color: '#eee',
                      title: 'Select 4'
                    }
                  ]
                }
              }
            })
        }}
      >
        Create Field
      </div>
    </div>
  )
}
