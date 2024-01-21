import { BsPlusLg, BsThreeDots } from 'react-icons/bs'
import {
  Column,
  useCreateCardMutation,
  useUpdateColumnMutation
} from '../../../graphql/gen-types'
import Controller from '../../commons/Controller'
import IconButton from '../../commons/IconButton'
import Input from '../../commons/Input'

type Props = {
  columnId: string
}
export default function ColumnHeader({ columnId }: Props) {
  const [createCard] = useCreateCardMutation({})
  const [updateColumn] = useUpdateColumnMutation({})

  return (
    <>
      <div className='flex items-center'>
        <div className='mr-1 flex-1 truncate rounded'>
          <Controller
            watching={[
              state => (state.board.blocks[columnId] as Column).title,
              ''
            ]}
            onSubmit={data => {
              updateColumn({
                variables: {
                  columnId,
                  columnInput: {
                    title: data
                  }
                }
              })
            }}
          >
            {({ value, onChange, onSubmit }) => (
              <Input
                className='w-full bg-transparent text-base font-semibold outline-none'
                placeholder='Card title'
                value={value}
                onChange={e => onChange(e.target.value)}
                onSubmit={() => onSubmit()}
              />
            )}
          </Controller>
        </div>

        <IconButton Icon={BsThreeDots} disable={true} />

        <IconButton
          Icon={BsPlusLg}
          onClick={() => {
            Array(10)
              .fill(1)
              .map((_e, index) => {
                const id = index + ''
                createCard({
                  variables: {
                    columnId,
                    cardInput: {
                      title: 'Math' + id
                    }
                  }
                })
              })
          }}
        />
      </div>
    </>
  )
}
