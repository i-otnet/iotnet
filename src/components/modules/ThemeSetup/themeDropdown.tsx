'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Paintbrush } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdownMenu'
import { ThemeStorage } from '@/lib/storage/ThemeStorage'

type Theme =
  | 'black'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'

const themeColors = {
  black: '#212A3E',
  red: '#EF4444',
  orange: '#F97316',
  amber: '#F59E0B',
  yellow: '#EAB308',
  lime: '#84CC16',
  green: '#22C55E',
  emerald: '#10B981',
  teal: '#14B8A6',
  cyan: '#06B6D4',
  sky: '#0EA5E9',
  blue: '#3B82F6',
  indigo: '#6366F1',
  violet: '#8B5CF6',
  purple: '#A855F7',
  fuchsia: '#D946EF',
  pink: '#EC4899',
  rose: '#F43F5E',
}

// Colors for dark mode (black becomes white)
const themeColorsDark = {
  black: '#FFFFFF',
  red: '#F87171',
  orange: '#FB923C',
  amber: '#FCD34D',
  yellow: '#FDE047',
  lime: '#A3E635',
  green: '#4ADE80',
  emerald: '#34D399',
  teal: '#2DD4BF',
  cyan: '#22D3EE',
  sky: '#38BDF8',
  blue: '#60A5FA',
  indigo: '#818CF8',
  violet: '#A78BFA',
  purple: '#C084FC',
  fuchsia: '#E879F9',
  pink: '#F472B6',
  rose: '#FB7185',
}

const modeOptions = [
  { mode: 'light' as const, icon: '☀️', label: 'Light' },
  { mode: 'dark' as const, icon: '🌙', label: 'Dark' },
  { mode: 'system' as const, icon: '💻', label: 'System' },
]

export function ThemeDropdown() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [selectedTheme, setSelectedTheme] = React.useState<Theme>('blue')
  const [selectedMode, setSelectedMode] = React.useState<
    'light' | 'dark' | 'system'
  >('system')
  const [mounted, setMounted] = React.useState(false)

  // Get the appropriate color palette based on current theme
  const getCurrentColors = () => {
    return resolvedTheme === 'dark' ? themeColorsDark : themeColors
  }

  React.useEffect(() => {
    setMounted(true)

    const savedTheme = (ThemeStorage.getPrimaryTheme() as Theme) || 'blue'
    const savedMode =
      (ThemeStorage.getPreferredMode() as 'light' | 'dark' | 'system') ||
      'system'

    setSelectedTheme(savedTheme)
    setSelectedMode(savedMode)

    // Set CSS variables for saved theme
    document.documentElement.style.setProperty(
      '--theme-primary-color',
      `var(--primary-${savedTheme})`
    )
    document.documentElement.style.setProperty(
      '--theme-primary-color-foreground',
      `var(--primary-${savedTheme}-foreground)`
    )
  }, [])

  // Update CSS variables when theme changes
  React.useEffect(() => {
    if (mounted) {
      document.documentElement.style.setProperty(
        '--theme-primary-color',
        `var(--primary-${selectedTheme})`
      )
      document.documentElement.style.setProperty(
        '--theme-primary-color-foreground',
        `var(--primary-${selectedTheme}-foreground)`
      )
    }
  }, [selectedTheme, mounted])

  // Initialize from current theme only after mounting to sync with next-themes
  React.useEffect(() => {
    if (mounted && theme) {
      // Only update mode state if it's different and it's a valid mode
      if (theme === 'light' || theme === 'dark' || theme === 'system') {
        if (selectedMode !== theme) {
          setSelectedMode(theme as 'light' | 'dark' | 'system')
        }
      }
    }
  }, [mounted, theme, selectedMode])

  const handleThemeChange = (newTheme: Theme) => {
    setSelectedTheme(newTheme)
    ThemeStorage.setPrimaryTheme(newTheme)

    // Update CSS variables immediately
    document.documentElement.style.setProperty(
      '--theme-primary-color',
      `var(--primary-${newTheme})`
    )
    document.documentElement.style.setProperty(
      '--theme-primary-color-foreground',
      `var(--primary-${newTheme}-foreground)`
    )

    // Dispatch custom event for components that need to react to theme changes
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('themeChanged', {
          detail: { theme: newTheme },
        })
      )
    }
  }

  const handleModeChange = (newMode: 'light' | 'dark' | 'system') => {
    setSelectedMode(newMode)
    ThemeStorage.setPreferredMode(newMode)

    // Apply theme using next-themes setTheme
    setTheme(newMode)
  }

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
        <Paintbrush className="w-4 h-4 text-muted-foreground" />
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="w-8 h-8 rounded-full bg-background border border-border hover:bg-muted transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Change theme"
        >
          <Paintbrush
            className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors"
            style={{ color: getCurrentColors()[selectedTheme] }}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {/* Color Themes */}
        <div className="p-2">
          <div className="text-xs font-medium text-muted-foreground mb-2">
            Color
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {Object.entries(getCurrentColors()).map(([themeName, color]) => (
              <button
                key={themeName}
                onClick={() => handleThemeChange(themeName as Theme)}
                className={`w-5 h-5 rounded-full border-2 transition-all hover:scale-110 ${
                  selectedTheme === themeName
                    ? 'border-foreground shadow-md scale-110'
                    : 'border-border/50'
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select ${themeName} theme`}
              />
            ))}
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Mode Options */}
        <div className="p-1">
          <div className="text-xs font-medium text-muted-foreground px-2 py-1">
            Mode
          </div>
          {modeOptions.map(({ mode, icon, label }) => (
            <DropdownMenuItem
              key={mode}
              onClick={() => handleModeChange(mode)}
              className={`flex items-center gap-2 text-sm ${
                selectedMode === mode ? 'bg-accent' : ''
              }`}
            >
              <span>{icon}</span>
              <span>{label}</span>
              {selectedMode === mode && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
