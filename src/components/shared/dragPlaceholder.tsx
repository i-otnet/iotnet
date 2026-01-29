interface DragPlaceholderProps {
  name: string
  isDragging?: boolean
}

export default function DragPlaceholder({
  name,
  isDragging = false,
}: DragPlaceholderProps) {
  return (
    <div
      className={`w-full h-full rounded-lg flex items-center justify-center transition-all duration-150 ${
        isDragging
          ? 'bg-primary/15 border-2 border-dashed border-primary shadow-lg ring-2 ring-primary opacity-80 backdrop-blur-sm'
          : 'bg-primary/10 border-2 border-dashed border-primary backdrop-blur-sm'
      }`}
    >
      <div className="text-center px-4">
        <p className="text-sm font-semibold text-primary">Moving Widget</p>
        <p className="text-xs text-muted-foreground mt-1">{name}</p>
      </div>
    </div>
  )
}
