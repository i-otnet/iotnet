'use client'

interface SearchDeviceDetailModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchDeviceDetailModal({
  isOpen,
  onClose,
}: SearchDeviceDetailModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Search Device Detail</h2>
        {/* Add modal content here */}
      </div>
    </div>
  )
}
