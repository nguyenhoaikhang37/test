import React from 'react'
import { IconType } from 'react-icons'

type Props = {
  disable?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
  Icon?: IconType
  number?: number
}

export default function IconButton({ disable, onClick, Icon, number }: Props) {
  return (
    <button
      className='relative flex h-6 w-6 items-center justify-center rounded transition-all hover:bg-slate-300 disabled:bg-transparent'
      onClick={e => {
        disable || (onClick && onClick(e))
      }}
      disabled={disable}
    >
      {Icon && <Icon className='h-4 w-4' />}

      {number && (
        <span className='absolute inset-0 flex items-center justify-center'>
          {number}
        </span>
      )}
    </button>
  )
}
