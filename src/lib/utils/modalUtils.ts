import { MouseEvent } from 'react'

/**
 * Utility functions for modal components
 */

/**
 * Handle backdrop click for custom modals
 */
export const handleBackdropClick = (
  e: MouseEvent<HTMLDivElement>,
  onClose: () => void
) => {
  if (e.target === e.currentTarget) {
    onClose()
  }
}

/**
 * Get modal size classes based on the size prop
 */
export const getModalSizeClasses = (
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md'
): string => {
  switch (size) {
    case 'sm':
      return 'sm:w-96'
    case 'md':
      return 'sm:max-w-[600px]'
    case 'lg':
      return 'sm:max-w-[800px]'
    case 'xl':
      return 'sm:max-w-[1200px]'
    case 'full':
      return 'sm:w-full sm:max-w-full'
    default:
      return 'sm:max-w-[600px]'
  }
}

/**
 * Base styles for custom modal backdrop
 */
export const MODAL_BACKDROP_CLASSES =
  'fixed inset-0 z-50 flex items-end sm:items-center justify-center'

/**
 * Base styles for modal backdrop overlay
 */
export const MODAL_OVERLAY_CLASSES = 'fixed inset-0 bg-black/50'

/**
 * Base styles for modal container
 */
export const MODAL_CONTAINER_BASE_CLASSES =
  'relative bg-background rounded-t-lg sm:rounded-lg w-full max-h-[80vh] overflow-y-auto shadow-lg'

/**
 * Base styles for modal header
 */
export const MODAL_HEADER_CLASSES =
  'sticky top-0 bg-background border-b p-4 flex items-center justify-between'

/**
 * Base styles for modal footer
 */
export const MODAL_FOOTER_CLASSES =
  'sticky bottom-0 bg-background border-t p-4 flex gap-2'

/**
 * Generate full modal container classes dengan size
 */
export const getModalContainerClasses = (
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md'
): string => {
  return `${MODAL_CONTAINER_BASE_CLASSES} ${getModalSizeClasses(size)}`
}
