'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ResizeLineIndicatorProps {
  lineX: number | null
  isVisible: boolean
}

export default function ResizeLineIndicator({
  lineX,
  isVisible,
}: ResizeLineIndicatorProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isVisible || lineX === null) {
    return null
  }

  return createPortal(
    <div
      className="fixed top-0 bottom-0 w-px bg-primary/60 pointer-events-none z-[9999]"
      style={{
        left: `${lineX}px`,
        transition: 'none',
      }}
    />,
    document.body
  )
}
