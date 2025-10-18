import {
  Smartphone,
  Router,
  Lightbulb,
  Shield,
  Camera,
  Activity,
  Cpu,
  Settings,
  BrainCircuit,
  Network,
  Layers,
  Zap,
  TrendingUp,
  GitBranch,
  Brain,
  Boxes,
} from 'lucide-react'

export const iconsData = {
  success: true,
  code: 200,
  message: 'Icons data retrieved successfully',
  data: {
    icons: [
      // Device Icons
      { id: 1, name: 'Smartphone', category: 'device', disabled: false },
      { id: 2, name: 'Router', category: 'device', disabled: false },
      { id: 3, name: 'Lightbulb', category: 'device', disabled: false },
      { id: 4, name: 'Shield', category: 'device', disabled: false },
      { id: 5, name: 'Camera', category: 'device', disabled: false },
      { id: 6, name: 'Activity', category: 'device', disabled: false },
      { id: 7, name: 'Cpu', category: 'device', disabled: false },
      { id: 8, name: 'Settings', category: 'device', disabled: false },
      // Model Icons
      { id: 9, name: 'BrainCircuit', category: 'model', disabled: false },
      { id: 10, name: 'TrendingUp', category: 'model', disabled: false },
      { id: 11, name: 'Network', category: 'model', disabled: false },
      { id: 12, name: 'Layers', category: 'model', disabled: false },
      { id: 13, name: 'Zap', category: 'model', disabled: false },
      { id: 14, name: 'Brain', category: 'model', disabled: false },
      { id: 15, name: 'GitBranch', category: 'model', disabled: false },
      { id: 16, name: 'Boxes', category: 'model', disabled: false },
    ],
  },
  meta: {
    totalIcons: 16,
    deviceIcons: 8,
    modelIcons: 8,
    timestamp: new Date().toISOString(),
  },
  timestamp: new Date().toISOString(),
}

// Icon Mapping - map icon names to lucide components
export const iconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  // Device Icons
  Smartphone,
  Router,
  Lightbulb,
  Shield,
  Camera,
  Activity,
  Cpu,
  Settings,
  // Model Icons
  BrainCircuit,
  TrendingUp,
  Network,
  Layers,
  Zap,
  Brain,
  GitBranch,
  Boxes,
}
