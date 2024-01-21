import { Textarea } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useEffect, useState } from 'react'
import { BsX } from 'react-icons/bs'
import { Card, useUpdateCardMutation } from '../../graphql/gen-types'
import { useAppSelector } from '../../redux/store'
import Controller from '../commons/Controller'
import Input from '../commons/Input'
import CommentWrapper from './detailCardModal/CommentWrapper'
import FieldWrapper from './detailCardModal/FieldWrapper'
import SubTask from './detailCardModal/SubTask'
import { useDispatch } from 'react-redux'
import { boardActions } from '../../redux/slices/board.slice'
import useFileUpload from '../../hooks/useUploadFile'

const UserTag = () => {
  return (
    <div className='flex h-6 w-fit items-center gap-1 rounded bg-slate-200 p-0.5'>
      <div className='h-5 w-5 rounded bg-black' />
      <p>SeNytera</p>
      <div className='cursor-pointer '>
        <BsX className='h-5 w-5' />
      </div>
    </div>
  )
}

const LabelTag = () => {
  return (
    <div className='flex h-6 w-fit items-center gap-1 rounded bg-slate-200 p-0.5'>
      <p>Mobile</p>
    </div>
  )
}

const DueDatePicker2 = () => {
  const [value, setValue] = useState<Date | null>(null)
  const [isOpen, setIsOpen] = useState(false) // Thêm biến trạng thái isOpen

  const handleToggle = () => {
    setIsOpen(!isOpen) // Khi ấn vào, toggle trạng thái isOpen
  }

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.due-date-picker')) {
      setIsOpen(false) // Nếu ấn ra ngoài, đặt isOpen về false
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick) // Lắng nghe sự kiện click trên toàn bộ trang
    return () => {
      document.removeEventListener('click', handleOutsideClick) // Hủy lắng nghe khi component bị hủy
    }
  }, [])

  return (
    <div className='due-date-picker group relative'>
      <div
        className='cursor-pointer rounded px-0.5 transition hover:bg-slate-300'
        onClick={handleToggle} // Thay đổi sự kiện hover thành onClick
      >
        {value?.toLocaleString() || 'pick'}
      </div>

      {isOpen && ( // Hiển thị component DatePicker nếu isOpen là true
        <div className='absolute z-50 pt-2'>
          <div className='rounded-md bg-white p-3 shadow-custom'>
            <DatePicker value={value} onChange={setValue} />
          </div>
        </div>
      )}
    </div>
  )
}

const tabs = ['Information', 'Comments']
export default function CardDetailModal() {
  const cardId = useAppSelector(state => state.board.cardOpenId)
  const [activeTab, setAtiveTab] = useState('Information')
  const [updateCard] = useUpdateCardMutation()
  const dispatch = useDispatch()

  const { uploadFile } = useFileUpload()

  return (
    <>
      {cardId && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 p-8'>
          <div className='flex h-full w-[500px] flex-col rounded-lg bg-white py-5 shadow'>
            <div className='flex w-full flex-1 flex-col gap-3'>
              <div className='flex items-center gap-3 px-5'>
                <Controller
                  watching={[
                    state => (state.board.blocks[cardId] as Card).title,
                    ''
                  ]}
                  onSubmit={data => {
                    updateCard({
                      variables: {
                        cardId,
                        cardInput: {
                          title: data
                        }
                      }
                    })
                  }}
                >
                  {({ onChange, value, onSubmit }) => (
                    <Input
                      className='line-clamp-2 w-full flex-1 text-lg font-semibold outline-none'
                      placeholder='Task name ...'
                      value={value || ''}
                      onChange={e => onChange(e.target.value)}
                      onSubmit={onSubmit}
                    />
                  )}
                </Controller>
                <button
                  className='rounded hover:bg-slate-200'
                  onClick={() => dispatch(boardActions.toggleCard())}
                >
                  <BsX className='h-6 w-6' />
                </button>
              </div>

              <FieldWrapper cardId={cardId} />

              <div className='flex flex-1 flex-col gap-3'>
                <div className='mx-5 flex gap-3 border-b-2'>
                  {tabs.map(tab => (
                    <div
                      key={tab}
                      className={`relative cursor-pointer transition hover:bg-slate-100 ${
                        activeTab === tab ? 'font-semibold' : ''
                      }`}
                      onClick={() => setAtiveTab(tab)}
                    >
                      {tab}
                      {activeTab === tab && (
                        <div className='absolute left-0 right-0 top-[100%] h-0.5 bg-black' />
                      )}
                    </div>
                  ))}
                </div>

                {activeTab === 'Information' && (
                  <div className='relative flex-1 text-sm'>
                    <div className='absolute inset-0 flex flex-col gap-3 overflow-y-auto px-5'>
                      <Textarea
                        placeholder='description'
                        className='text-base'
                      />

                      <SubTask cardId={cardId} />

                      <div>
                        <div className='flex items-center gap-2'>
                          <p className='font-semibold uppercase'>Attachments</p>
                          <span>I</span>

                          <label
                            htmlFor='uploadFile'
                            className='text-sm text-blue-400'
                          >
                            Upload
                          </label>

                          <input
                            id='uploadFile'
                            type='file'
                            value=''
                            className='hidden'
                            accept='image/*, application/pdf'
                            onChange={(e: any) => {
                              console.log(e.target.files[0])
                              if (e?.target?.validity?.valid) {
                                uploadFile(e.target.files[0]).then(url =>
                                  console.log('uploaded link', url)
                                )
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'Comments' && <CommentWrapper cardId={cardId} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
