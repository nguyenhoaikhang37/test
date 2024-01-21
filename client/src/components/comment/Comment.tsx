import Input from '../commons/Input'

export default function Comment() {
  return (
    <div className='mt-3 flex justify-end gap-3'>
      <Input className='h-9 flex-1 rounded-md bg-slate-200 px-3' />
      <button className='flex transform items-center justify-center rounded-lg bg-gray-800 px-3 py-2 text-white hover:ring-1'>
        Create
      </button>
    </div>
  )
}
