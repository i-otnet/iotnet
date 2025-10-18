import { useState, useCallback } from 'react'

/**
 * Custom hook untuk manage modal state
 * Menggabungkan open/close logic yang sering dipakai di modal components
 */
export function useModalState(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  }
}

/**
 * Custom hook untuk manage multi-view modal state
 * Digunakan untuk modal yang memiliki multiple views/steps
 */
export function useMultiViewModal<T extends string>(initialView: T) {
  const [currentView, setCurrentView] = useState<T>(initialView)

  const goToView = useCallback((view: T) => {
    setCurrentView(view)
  }, [])

  const resetView = useCallback(() => {
    setCurrentView(initialView)
  }, [initialView])

  return {
    currentView,
    setCurrentView,
    goToView,
    resetView,
  }
}
