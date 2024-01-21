import classNames from 'classnames'
import React, { useRef } from 'react'

type TSaveOn = 'onEnter' | 'onEsc' | 'onBlur'

type TInput = {
  isReadOnly?: boolean
  hasError?: boolean
  inputClassName?: string
  errorClassName?: string
  blurOnSubmit?: boolean
  saveType?: TSaveOn[]
  onSubmit?: (e: React.ChangeEvent<HTMLInputElement>) => void
} & Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'onSubmit' | 'ref'
>

export default function Input({
  className,
  inputClassName,
  errorClassName,
  isReadOnly,
  hasError,
  blurOnSubmit = true,
  saveType = ['onEnter', 'onEsc', 'onBlur'],
  onSubmit = () => {},
  onBlur,
  onKeyDown,
  ...inputProps
}: TInput) {
  const _className = classNames(className, inputClassName, {
    [errorClassName || '']: hasError
  })

  const inputRef = useRef<HTMLInputElement>(null)

  const preSubmit = (e: any) => {
    if (blurOnSubmit && inputRef.current) {
      inputRef.current.blur()
    }
    onSubmit(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (saveType.includes('onBlur')) {
      preSubmit(e)
    }
    onBlur && onBlur(e)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (saveType.includes('onEnter') && e.key === 'Enter') {
      preSubmit(e)
    }

    if (saveType.includes('onEsc') && e.key === 'Escape') {
      preSubmit(e)
    }

    onKeyDown && onKeyDown(e)
  }

  return (
    <input
      {...inputProps}
      ref={inputRef}
      className={_className}
      readOnly={isReadOnly}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  )
}
