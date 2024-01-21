import classnames from 'classnames'
import React from 'react'
import { IconType } from 'react-icons'
import { BsCheckSquareFill, BsDashSquareFill, BsSquare } from 'react-icons/bs'

export type TCheckValue = 'check' | 'unCheck' | 'semiCheck'

type Props = {
  checkValue?: TCheckValue
  onChange?: (res: TCheckValue) => void
  wrapperClassName?: string
  iconClassName?: string
  isDisabled?: boolean
  CheckedIcon?: IconType
  UncheckedIcon?: IconType
  SimiCheckIcon?: IconType
}

const Checkbox: React.FC<Props> = ({
  checkValue = 'unCheck',
  onChange = () => {},
  wrapperClassName = '',
  iconClassName = '',
  isDisabled = false,
  CheckedIcon = BsCheckSquareFill,
  UncheckedIcon = BsSquare,
  SimiCheckIcon = BsDashSquareFill
}) => {
  const handleCheckboxChange = () => {
    if (!isDisabled) {
      switch (checkValue) {
        case 'check':
          onChange('unCheck')
          break
        case 'unCheck':
          onChange('check')
          break
        case 'semiCheck':
          onChange('check')
          break
      }
    }
  }

  const wrapperClasses = classnames(
    'flex items-center w-4 h-4 cursor-pointer',
    wrapperClassName,
    {
      'pointer-events-none': isDisabled
    }
  )

  const iconClasses = classnames('text-black', iconClassName)

  const renderIcon = () => {
    switch (checkValue) {
      case 'check':
        return <CheckedIcon className={iconClasses} />
      case 'unCheck':
        return <UncheckedIcon className={iconClasses} />
      case 'semiCheck':
        return <SimiCheckIcon className={iconClasses} />
      default:
        return null
    }
  }

  return (
    <div className={wrapperClasses} onClick={handleCheckboxChange}>
      {renderIcon()}
    </div>
  )
}

export default Checkbox
