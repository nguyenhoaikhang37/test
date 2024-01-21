import { useEffect, useState } from 'react'

export default function useColumnHeight() {
  const [elementHeight, setElementHeight] = useState(600)

  useEffect(() => {
    const handleResize = () => {
      const boardContentElement = document.getElementById('boardContentId')
      if (boardContentElement) {
        const height = boardContentElement.clientHeight
        setElementHeight(height)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return elementHeight
}
