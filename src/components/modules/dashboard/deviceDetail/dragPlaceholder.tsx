interface DragPlaceholderProps {
  name: string
}

export default function DragPlaceholder({ name }: DragPlaceholderProps) {
  return (
    <div className="w-full h-full bg-primary/10 border-2 border-dashed border-primary rounded-lg flex items-center justify-center backdrop-blur-sm">
      <div className="text-center px-4">
        <p className="text-sm font-semibold text-primary">Moving Widget</p>
        <p className="text-xs text-muted-foreground mt-1">{name}</p>
      </div>
    </div>
  )
}
