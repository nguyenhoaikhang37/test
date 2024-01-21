import { Textarea } from '@mantine/core'
import { DatePicker, DateTimePicker } from '@mantine/dates'
import { useEffect, useState } from 'react'
import {
  BsChatDots,
  BsCheck2Square,
  BsClockHistory,
  BsDashSquareFill,
  BsPaperclip,
  BsPlusCircle,
  BsX
} from 'react-icons/bs'
import Checkbox from '../components/commons/Checkbox'
import Input from '../components/commons/Input'

const UserTag = ({ userId }: { userId?: string }) => {
  //call Redux get data
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

const LabelTag = ({ labeId }: { labeId?: string }) => {
  //call Redux get data
  return (
    <div className='flex h-6 w-fit items-center gap-1 rounded bg-slate-200 p-0.5'>
      <p>Mobile</p>
    </div>
  )
}

const Item = ({ itemId }: { itemId?: string }) => {
  const [isCheck, setChecked] = useState(false)
  return (
    <div className='flex h-6 items-center gap-2'>
      <Checkbox onChange={setChecked} isChecked={isCheck} />
      <Input
        className='bg-transparent outline-none'
        defaultValue={'Task số 1'}
      />
    </div>
  )
}

const Checklist = ({ checklistId }: { checklistId?: string }) => {
  //call Redux get data
  return (
    <div className='flex flex-col gap-1 rounded-md bg-slate-100 p-3 text-gray-700'>
      <div className='flex gap-2'>
        <BsDashSquareFill className='h-4 w-4 text-black' />
        <Input
          className='w-full truncate bg-transparent text-black outline-none'
          placeholder='Checklist title ...'
          defaultValue='Task cần làm'
        />
      </div>

      <div className='pl-6'>
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  )
}

const tabs = ['Info', 'Comments', 'Activities']

const DueDatePicker = () => {
  const [value, setValue] = useState<Date | null>(null)

  return (
    <div className='group relative'>
      <div className='cursor-pointer rounded px-0.5 transition hover:bg-slate-300'>
        {value?.toString() || 'pick'}
      </div>

      <div className='invisible absolute z-50 pt-2 group-hover:visible'>
        <div className='rounded-md bg-white p-3 shadow-custom'>
          <DatePicker value={value} onChange={setValue} />
        </div>
      </div>
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

const DueDatePicker3 = () => {
  const [value, setValue] = useState<Date | null>(null)

  return (
    <div className='due-date-picker group relative'>
      <DateTimePicker />
    </div>
  )
}

const Comments = () => {
  return (
    <div className='absolute inset-0 flex flex-col gap-3 overflow-y-scroll pr-2'>
      <div className='flex gap-3'>
        <div className='h-8 w-8 rounded-full bg-slate-300'></div>
        <div className='flex-1'>
          <div className='flex items-center gap-3'>
            <p className='font-semibold'>Senytera</p>{' '}
            <p className='text-sm'>20/04/2023</p>
          </div>
          <p className='w-fit rounded bg-slate-100 p-2'>
            ex w-[300px] flex-col gap-2.5 rounded-md bg-white p-4 text-sm shadex
            w-[300px] flex-col gap-2.5 rounded-md bg-white p-4 text-sm shadex
            w-[300px] flex-col gap-2.5 rounded-md bg-white p-4 text-sm shad
          </p>
        </div>
      </div>

      <div className='flex gap-3'>
        <div className='h-8 w-8 rounded-full bg-slate-300'></div>
        <div className='flex-1'>
          <div className='flex items-center gap-3'>
            <p className='font-semibold'>Senytera</p>
            <p>I</p> <p className='text-sm'>20/04/2023</p>
          </div>
          <p className='w-fit rounded bg-slate-100 p-2'>
            ex w-[300px] flex-col gap-2.5
          </p>
          <div className='mt-3 flex gap-3'>
            <div className='h-8 w-8 rounded-full bg-slate-300'></div>
            <div className='flex-1'>
              <div className='flex items-center gap-3'>
                <p className='font-semibold'>Senytera</p>
                <p>I</p> <p className='text-sm'>20/04/2023</p>
              </div>
              <p className='w-fit rounded bg-slate-100 p-2'>
                ex w-[300px] flex-col gap-2.0px flex-col gap-2.5 rounded-md
                bg-white p-4 text-sm shadex w-[300px] flex-col gap-2.5
                rounded-md bg-white p-4 text-sm shadex w-[300px] flex-col
                gap-2.5 rounded-md bg-white p-4 tex5
              </p>
            </div>
          </div>
          <div className='mt-3 flex gap-3'>
            <div className='h-8 w-8 rounded-full bg-slate-300'></div>
            <div className='flex-1'>
              <div className='flex items-center gap-3'>
                <p className='font-semibold'>Senytera</p>
                <p>I</p> <p className='text-sm'>20/04/2023</p>
              </div>
              <p className='w-fit rounded bg-slate-100 p-2'>
                ex w-[300px] flex-col gap-2.0px flex-col gap-2.5 rounded-md
                bg-white p-4 text-sm shadex w-[300px] flex-col gap-2.5
                rounded-md bg-white p-4 text-sm shadex w-[300px] flex-col
                gap-2.5 rounded-md bg-white p-4 tex5
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex gap-3'>
        <div className='h-8 w-8 rounded-full bg-slate-300'></div>
        <div className='flex-1'>
          <div className='flex items-center gap-3'>
            <p className='font-semibold'>Senytera</p>
            <p>I</p> <p className='text-sm'>20/04/2023</p>
          </div>
          <p className='w-fit rounded bg-slate-100 p-2'>
            ex w-[300px] flex-col gap-2.5
          </p>
          <div className='mt-3 flex gap-3'>
            <div className='h-8 w-8 rounded-full bg-slate-300'></div>
            <div className='flex-1'>
              <div className='flex items-center gap-3'>
                <p className='font-semibold'>Senytera</p>
                <p>I</p> <p className='text-sm'>20/04/2023</p>
              </div>
              <p className='w-fit rounded bg-slate-100 p-2'>
                ex w-[300px] flex-col gap-2.0px flex-col gap-2.5 rounded-md
                bg-white p-4 text-sm shadex w-[300px] flex-col gap-2.5
                rounded-md bg-white p-4 text-sm shadex w-[300px] flex-col
                gap-2.5 rounded-md bg-white p-4 tex5
              </p>
            </div>
          </div>
          <div className='mt-3 flex gap-3'>
            <div className='h-8 w-8 rounded-full bg-slate-300'></div>
            <div className='flex-1'>
              <div className='flex items-center gap-3'>
                <p className='font-semibold'>Senytera</p>
                <p>I</p> <p className='text-sm'>20/04/2023</p>
              </div>
              <p className='w-fit rounded bg-slate-100 p-2'>
                ex w-[300px] flex-col gap-2.0px flex-col gap-2.5 rounded-md
                bg-white p-4 text-sm shadex w-[300px] flex-col gap-2.5
                rounded-md bg-white p-4 text-sm shadex w-[300px] flex-col
                gap-2.5 rounded-md bg-white p-4 tex5
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Card = () => {
  return (
    <div className='flex w-[300px] flex-col gap-2.5 rounded-md bg-white p-4 text-sm shadow'>
      <div className='flex gap-2'>
        <LabelTag />
        <LabelTag />
        <LabelTag />
      </div>

      <div className='h-20 rounded bg-slate-100'></div>

      <p className='text-lg font-semibold'>
        Bug duplicate item ug duplicate ite ug duplicate ite
      </p>

      <div className='flex gap-2'>
        <div className='flex flex-1 items-center gap-1'>
          <BsClockHistory /> 20/04/2023
        </div>

        <div className='flex items-center gap-1'>
          <BsCheck2Square /> 13/23
          {/* <Controller<string>
            watching={[
              state => {
                const { checklists, checklistsId } = state.board.cards['cardId']
                const { completed, total } = checklistsId.reduce(
                  (pre, id) => {
                    const { itemsId, items } = checklists[id]
                    return {
                      completed:
                        pre.completed +
                          itemsId.filter(itemId => items[itemId].completed)
                            .length || 0,
                      total: pre.total + itemsId.length || 0
                    }
                  },
                  { completed: 0, total: 0 }
                )

                if (total > 0) {
                  return `${completed}/${total}`
                }

                console.log(completed, total)

                return ''
              },
              ''
            ]}
          >
            {({ value }) => <></>}
          </Controller> */}
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <div className='flex flex-1'>
          <div className='flex h-6 w-6 items-center justify-center rounded-full border border-white bg-slate-500 text-white'>
            A
          </div>
          <div className='flex h-6 w-6 translate-x-[-30%] items-center justify-center rounded-full border border-white bg-slate-500 text-white'>
            B
          </div>
          <div className='flex h-6 w-6 translate-x-[-60%] items-center justify-center rounded-full border border-white bg-slate-500 text-white'>
            C
          </div>
          <div className='flex h-6 w-6 translate-x-[-90%] items-center justify-center rounded-full border border-white bg-slate-500 text-white'>
            +3
          </div>
        </div>

        <div className='flex items-center gap-1'>
          <BsPaperclip /> 3
        </div>

        <div className='flex items-center gap-1'>
          <BsChatDots /> 13/24
        </div>
      </div>
    </div>
  )
}

const CardDetail = () => {
  const [activeTab, setAtiveTab] = useState('Info')
  return (
    <div className='flex h-full w-[600px] flex-col rounded-lg bg-white p-5 shadow'>
      {/* header */}
      {/* <div className='flex'>
        <button className='flex h-6 w-6 items-center justify-center rounded'></button>

        <div className='flex flex-1 items-center justify-center'>
          <p>Add a new Task</p>
        </div>

        <button className='flex h-6 w-6 items-center justify-center rounded bg-slate-300'>
          <BsX />
        </button>
      </div> */}

      {/* content */}
      <div className='flex w-full flex-1 flex-col gap-3 pt-3'>
        <Input
          className='w-full truncate text-2xl font-semibold outline-none'
          placeholder='Task name ...'
          defaultValue='Bug duplicate item'
        />

        <div className='flex w-full items-center'>
          <div className='w-32'>Due date:</div>
          <DueDatePicker2 />
        </div>

        <div className='flex w-full items-center'>
          <div className='w-32'>Create by:</div>
          <div className='flex flex-1 gap-2'>
            <UserTag />
          </div>
        </div>

        <div className='flex w-full items-center'>
          <div className='w-32'>Assignees:</div>
          <div className='flex flex-1 gap-2'>
            <UserTag />
            <UserTag />
            <UserTag />
            <button className='flex h-[24.8px] w-[24.8px] items-center justify-center'>
              <BsPlusCircle className='h-5 w-5' />
            </button>
          </div>
        </div>

        <div className='flex w-full items-center'>
          <div className='w-32'>Tag:</div>
          <div className='flex flex-1 gap-2'>
            <LabelTag />
            <LabelTag />
            <LabelTag />
            <LabelTag />
            <LabelTag />
          </div>
        </div>

        <div className='flex flex-1 flex-col gap-3'>
          <div className='flex w-full gap-3 border-b-2'>
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

          {/* content  */}
          <div className='relative flex-1'>
            {activeTab === 'Info' && (
              <div className='flex flex-col gap-3'>
                {/* <div className='h-32 rounded-md bg-gray-100 ring-1'></div> */}
                <Textarea placeholder='description' className='text-base' />

                <div className='flex flex-col gap-2'>
                  <div className='flex items-center gap-1'>
                    <p className='flex-1 font-semibold uppercase'>Sub Tasks</p>
                    <BsCheck2Square /> 13/23
                  </div>
                  <div className='flex flex-col gap-3'>
                    <Checklist />
                    <Checklist />
                  </div>
                </div>

                <div>
                  <div className='flex items-center gap-2'>
                    <p className='font-semibold uppercase'>Attachments</p>
                    <span>I</span>
                    <button className='text-sm text-blue-400'>Upload</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Comments' && <Comments />}
          </div>
        </div>
      </div>

      {/* footer */}
      <div className='mt-3 flex justify-end gap-3'>
        <button className='flex transform items-center justify-center rounded-lg bg-slate-200 px-3 py-2 hover:ring-1'>
          Close
        </button>
        <button className='flex transform items-center justify-center rounded-lg bg-gray-800 px-3 py-2 text-white hover:ring-1'>
          Create
        </button>
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className='flex h-screen w-screen items-center bg-gray-100 p-8'>
      <div className='flex-1'>
        <Card />
      </div>

      <CardDetail />
    </div>
  )
}
