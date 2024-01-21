import { DatePicker } from '@mantine/dates'
import { useEffect, useState } from 'react'

type Props = {
  value?: Date
  onChange: (e: Date) => void
  keyId: string
}

const DatePickerField = ({ onChange, value, keyId }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest(`.due-date-picker-${keyId}`)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return (
    <div className={`due-date-picker-${keyId} group relative`}>
      <div
        className='w-fit cursor-pointer rounded bg-slate-100 px-1.5 py-1 text-sm transition hover:bg-slate-300'
        onClick={handleToggle}
      >
        {value?.toLocaleString() || 'pick'}
      </div>

      {isOpen && (
        <div className='absolute z-50 pt-2'>
          <div className='rounded-md bg-white p-3 shadow-custom'>
            <DatePicker value={value} onChange={onChange} />
          </div>
        </div>
      )}
    </div>
  )
}

export default DatePickerField
