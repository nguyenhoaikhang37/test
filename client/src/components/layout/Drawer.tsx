import { useState } from 'react'

export default function Drawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  return (
    <div
      className={`fixed inset-0 flex justify-end p-6 ${
        isDrawerOpen ? 'z-50 bg-black/50' : 'z-[-1] bg-transparent'
      }`}
    >
      <button onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
        Open Drawer
      </button>

      <div
        className={`w-96 rounded-xl bg-white shadow-lg transition-all ${
          isDrawerOpen || 'translate-x-[calc(100%+24px)] bg-transparent'
        }`}
      ></div>
    </div>
  )
}
